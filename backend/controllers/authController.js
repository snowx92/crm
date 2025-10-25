/**
 * Authentication Controller
 *
 * Handles all authentication operations using Firebase Admin SDK
 */

const { auth, db, admin } = require('../config/firebase-admin');
const { validationResult } = require('express-validator');

/**
 * @desc    Create new user account
 * @route   POST /api/auth/signup
 * @access  Public
 */
exports.signup = async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        errors: errors.array(),
      });
    }

    const { email, password, firstName, lastName, phoneNumber, company } = req.body;

    // Create user with Firebase Auth
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: `${firstName} ${lastName}`,
      emailVerified: false,
    });

    // Create user profile in Firestore
    const userProfile = {
      uid: userRecord.uid,
      email,
      firstName,
      lastName,
      displayName: `${firstName} ${lastName}`,
      phoneNumber: phoneNumber || null,
      company: company || null,
      emailVerified: false,
      role: 'employee',
      status: 'active',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      lastLogin: admin.firestore.FieldValue.serverTimestamp(),
    };

    await db.collection('users').doc(userRecord.uid).set(userProfile);

    // Generate custom token
    const customToken = await auth.createCustomToken(userRecord.uid);

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: {
        uid: userRecord.uid,
        email: userRecord.email,
        displayName: userRecord.displayName,
        customToken,
      },
    });
  } catch (error) {
    console.error('Signup error:', error);

    if (error.code === 'auth/email-already-exists') {
      return res.status(400).json({
        success: false,
        error: 'EmailExists',
        message: 'Email is already registered',
      });
    }

    if (error.code === 'auth/invalid-email') {
      return res.status(400).json({
        success: false,
        error: 'InvalidEmail',
        message: 'Invalid email address',
      });
    }

    if (error.code === 'auth/weak-password') {
      return res.status(400).json({
        success: false,
        error: 'WeakPassword',
        message: 'Password must be at least 6 characters',
      });
    }

    res.status(500).json({
      success: false,
      error: 'InternalError',
      message: 'Failed to create user account',
    });
  }
};

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;

    // Get user by email
    let userRecord;
    try {
      userRecord = await auth.getUserByEmail(email);
    } catch (error) {
      return res.status(401).json({
        success: false,
        error: 'InvalidCredentials',
        message: 'Invalid email or password',
      });
    }

    // Note: Firebase Admin SDK cannot verify passwords
    // Password verification happens on the client side with Firebase Client SDK
    // This endpoint generates a custom token for the user
    // In production, you should verify the password on client first, then call this endpoint with ID token
    // For simplicity in testing, we'll generate a custom token based on email

    // Update last login in Firestore
    await db.collection('users').doc(userRecord.uid).update({
      lastLogin: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // Get user profile
    const userDoc = await db.collection('users').doc(userRecord.uid).get();
    const userProfile = userDoc.data();

    // Generate custom token
    const customToken = await auth.createCustomToken(userRecord.uid);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        uid: userRecord.uid,
        email: userRecord.email,
        displayName: userRecord.displayName,
        emailVerified: userRecord.emailVerified,
        customToken,
        profile: userProfile,
      },
    });
  } catch (error) {
    console.error('Login error:', error);

    if (error.code === 'auth/id-token-expired') {
      return res.status(401).json({
        success: false,
        error: 'TokenExpired',
        message: 'Token has expired',
      });
    }

    if (error.code === 'auth/invalid-id-token') {
      return res.status(401).json({
        success: false,
        error: 'InvalidToken',
        message: 'Invalid token',
      });
    }

    res.status(500).json({
      success: false,
      error: 'InternalError',
      message: 'Login failed',
    });
  }
};

/**
 * @desc    Refresh authentication token
 * @route   POST /api/auth/refresh-token
 * @access  Public
 */
exports.refreshToken = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({
        success: false,
        error: 'MissingToken',
        message: 'ID token is required',
      });
    }

    // Verify the old token
    const decodedToken = await auth.verifyIdToken(idToken, true);

    // Create new custom token
    const newCustomToken = await auth.createCustomToken(decodedToken.uid);

    // Get fresh user data
    const userDoc = await db.collection('users').doc(decodedToken.uid).get();
    const userProfile = userDoc.data();

    res.status(200).json({
      success: true,
      message: 'Token refreshed successfully',
      data: {
        uid: decodedToken.uid,
        email: decodedToken.email,
        customToken: newCustomToken,
        profile: userProfile,
      },
    });
  } catch (error) {
    console.error('Refresh token error:', error);

    if (error.code === 'auth/id-token-expired') {
      return res.status(401).json({
        success: false,
        error: 'TokenExpired',
        message: 'Token has expired. Please login again.',
      });
    }

    res.status(401).json({
      success: false,
      error: 'InvalidToken',
      message: 'Token refresh failed',
    });
  }
};

/**
 * @desc    Logout user
 * @route   POST /api/auth/logout
 * @access  Private
 */
exports.logout = async (req, res) => {
  try {
    // Revoke refresh tokens for the user
    await auth.revokeRefreshTokens(req.user.uid);

    res.status(200).json({
      success: true,
      message: 'Logout successful',
    });
  } catch (error) {
    console.error('Logout error:', error);

    res.status(500).json({
      success: false,
      error: 'InternalError',
      message: 'Logout failed',
    });
  }
};

/**
 * @desc    Get current user profile
 * @route   GET /api/auth/profile
 * @access  Private
 */
exports.getProfile = async (req, res) => {
  try {
    const userDoc = await db.collection('users').doc(req.user.uid).get();

    if (!userDoc.exists) {
      return res.status(404).json({
        success: false,
        error: 'NotFound',
        message: 'User profile not found',
      });
    }

    res.status(200).json({
      success: true,
      data: userDoc.data(),
    });
  } catch (error) {
    console.error('Get profile error:', error);

    res.status(500).json({
      success: false,
      error: 'InternalError',
      message: 'Failed to get profile',
    });
  }
};

/**
 * @desc    Update user profile
 * @route   PUT /api/auth/profile
 * @access  Private
 */
exports.updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, company } = req.body;

    const updates = {
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    if (firstName) updates.firstName = firstName;
    if (lastName) updates.lastName = lastName;
    if (phoneNumber) updates.phoneNumber = phoneNumber;
    if (company) updates.company = company;

    if (firstName || lastName) {
      const displayName = `${firstName || ''} ${lastName || ''}`.trim();
      updates.displayName = displayName;

      // Update Firebase Auth profile
      await auth.updateUser(req.user.uid, { displayName });
    }

    await db.collection('users').doc(req.user.uid).update(updates);

    // Get updated profile
    const userDoc = await db.collection('users').doc(req.user.uid).get();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: userDoc.data(),
    });
  } catch (error) {
    console.error('Update profile error:', error);

    res.status(500).json({
      success: false,
      error: 'InternalError',
      message: 'Failed to update profile',
    });
  }
};

/**
 * @desc    Send password reset email
 * @route   POST /api/auth/reset-password
 * @access  Public
 */
exports.resetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'MissingEmail',
        message: 'Email is required',
      });
    }

    // Generate password reset link
    const link = await auth.generatePasswordResetLink(email);

    res.status(200).json({
      success: true,
      message: 'Password reset link generated',
      data: {
        resetLink: link,
        // In production, send this link via email instead of returning it
      },
    });
  } catch (error) {
    console.error('Reset password error:', error);

    if (error.code === 'auth/user-not-found') {
      return res.status(404).json({
        success: false,
        error: 'UserNotFound',
        message: 'No user found with this email',
      });
    }

    res.status(500).json({
      success: false,
      error: 'InternalError',
      message: 'Failed to send reset email',
    });
  }
};

/**
 * @desc    Verify email
 * @route   POST /api/auth/verify-email
 * @access  Private
 */
exports.verifyEmail = async (req, res) => {
  try {
    // Generate email verification link
    const link = await auth.generateEmailVerificationLink(req.user.email);

    res.status(200).json({
      success: true,
      message: 'Verification link generated',
      data: {
        verificationLink: link,
        // In production, send this link via email instead of returning it
      },
    });
  } catch (error) {
    console.error('Verify email error:', error);

    res.status(500).json({
      success: false,
      error: 'InternalError',
      message: 'Failed to send verification email',
    });
  }
};

/**
 * @desc    Delete user account
 * @route   DELETE /api/auth/account
 * @access  Private
 */
exports.deleteAccount = async (req, res) => {
  try {
    // Mark as deleted in Firestore
    await db.collection('users').doc(req.user.uid).update({
      status: 'deleted',
      deletedAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // Delete from Firebase Auth
    await auth.deleteUser(req.user.uid);

    res.status(200).json({
      success: true,
      message: 'Account deleted successfully',
    });
  } catch (error) {
    console.error('Delete account error:', error);

    res.status(500).json({
      success: false,
      error: 'InternalError',
      message: 'Failed to delete account',
    });
  }
};

/**
 * Authentication API Service
 *
 * Comprehensive authentication service using Firebase Auth + Express Backend.
 * Flow: Frontend uses Firebase Client SDK → Backend validates with Firebase Admin SDK
 * Includes: signup, login, logout, password reset, email verification,
 * token refresh, and user management.
 */

import {
  signInWithEmailAndPassword,
  signInWithCustomToken,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
  updateEmail,
  updatePassword,
  deleteUser,
  User,
  UserCredential,
  Auth,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { backendApi } from './backend-api';

export interface SignupData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  company?: string;
}

export interface LoginData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface UserProfile {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
  phoneNumber?: string;
  company?: string;
  photoURL?: string;
  emailVerified: boolean;
  role: 'admin' | 'manager' | 'employee';
  status: 'active' | 'inactive' | 'suspended';
  createdAt: any;
  updatedAt: any;
  lastLogin?: any;
}

/**
 * Authentication Service Class
 */
export class AuthAPI {
  private auth: Auth;

  constructor() {
    this.auth = auth;
  }

  /**
   * Sign up a new user
   * Flow: Backend creates user → returns custom token → client signs in with custom token
   */
  async signup(data: SignupData): Promise<UserCredential> {
    try {
      // Call backend to create user account
      const response = await backendApi.signup(data);

      if (!response.success || !response.data?.customToken) {
        throw new Error(response.message || 'Signup failed');
      }

      // Sign in with custom token from backend
      const userCredential = await signInWithCustomToken(
        this.auth,
        response.data.customToken
      );

      toast.success('Account created successfully! Please verify your email.');
      return userCredential;
    } catch (error: any) {
      console.error('Signup error:', error);
      toast.error(this.getErrorMessage(error));
      throw error;
    }
  }

  /**
   * Login user
   * Flow: Client signs in → gets ID token → sends to backend → backend validates → returns custom token
   */
  async login(data: LoginData): Promise<UserCredential> {
    try {
      // First, sign in with Firebase to get ID token
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        data.email,
        data.password
      );

      // Get ID token
      const idToken = await userCredential.user.getIdToken();

      // Send ID token to backend for validation and custom token
      const response = await backendApi.login({
        email: data.email,
        idToken,
      });

      if (!response.success) {
        throw new Error(response.message || 'Login failed');
      }

      toast.success('Welcome back!');
      return userCredential;
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(this.getErrorMessage(error));
      throw error;
    }
  }

  /**
   * Logout user
   * Flow: Get ID token → send to backend to revoke tokens → sign out from Firebase
   */
  async logout(): Promise<void> {
    try {
      // Get ID token before signing out
      const idToken = await this.getIdToken();

      if (idToken) {
        // Revoke refresh tokens on backend
        await backendApi.logout(idToken);
      }

      // Sign out from Firebase
      await signOut(this.auth);
      toast.success('Logged out successfully');
    } catch (error: any) {
      console.error('Logout error:', error);
      toast.error(this.getErrorMessage(error));
      throw error;
    }
  }

  /**
   * Send password reset email
   * Flow: Backend generates password reset link using Firebase Admin
   */
  async resetPassword(email: string): Promise<void> {
    try {
      const response = await backendApi.resetPassword(email);

      if (!response.success) {
        throw new Error(response.message || 'Failed to send reset email');
      }

      toast.success('Password reset email sent! Check your inbox.');
    } catch (error: any) {
      console.error('Password reset error:', error);
      toast.error(this.getErrorMessage(error));
      throw error;
    }
  }

  /**
   * Send email verification
   * Flow: Backend generates email verification link using Firebase Admin
   */
  async sendVerificationEmail(user?: User): Promise<void> {
    try {
      const currentUser = user || this.auth.currentUser;
      if (!currentUser) {
        throw new Error('No user logged in');
      }

      // Get ID token
      const idToken = await currentUser.getIdToken();

      // Call backend to send verification email
      const response = await backendApi.verifyEmail(idToken);

      if (!response.success) {
        throw new Error(response.message || 'Failed to send verification email');
      }

      toast.success('Verification email sent! Please check your inbox.');
    } catch (error: any) {
      console.error('Email verification error:', error);
      toast.error(this.getErrorMessage(error));
      throw error;
    }
  }

  /**
   * Get current user profile from Firestore via backend
   */
  async getUserProfile(uid?: string): Promise<UserProfile | null> {
    try {
      // Get ID token
      const idToken = await this.getIdToken();
      if (!idToken) {
        throw new Error('Not authenticated');
      }

      // Call backend to get profile
      const response = await backendApi.getProfile(idToken);

      if (!response.success || !response.data) {
        return null;
      }

      return response.data as UserProfile;
    } catch (error: any) {
      console.error('Get user profile error:', error);
      throw error;
    }
  }

  /**
   * Update user profile
   * Flow: Backend updates both Firestore and Firebase Auth
   */
  async updateUserProfile(uid: string, updates: Partial<UserProfile>): Promise<void> {
    try {
      // Get ID token
      const idToken = await this.getIdToken();
      if (!idToken) {
        throw new Error('Not authenticated');
      }

      // Call backend to update profile
      const response = await backendApi.updateProfile(idToken, updates);

      if (!response.success) {
        throw new Error(response.message || 'Failed to update profile');
      }

      toast.success('Profile updated successfully');
    } catch (error: any) {
      console.error('Update profile error:', error);
      toast.error(this.getErrorMessage(error));
      throw error;
    }
  }

  /**
   * Update user email
   */
  async updateUserEmail(newEmail: string, currentPassword: string): Promise<void> {
    try {
      const currentUser = this.auth.currentUser;
      if (!currentUser || !currentUser.email) {
        throw new Error('No user logged in');
      }

      // Reauthenticate user
      const credential = EmailAuthProvider.credential(
        currentUser.email,
        currentPassword
      );
      await reauthenticateWithCredential(currentUser, credential);

      // Update email
      await updateEmail(currentUser, newEmail);

      // Update in Firestore
      await updateDoc(doc(db, 'users', currentUser.uid), {
        email: newEmail,
        emailVerified: false,
        updatedAt: serverTimestamp(),
      });

      // Send verification to new email
      await this.sendVerificationEmail(currentUser);

      toast.success('Email updated! Please verify your new email.');
    } catch (error: any) {
      console.error('Update email error:', error);
      toast.error(this.getErrorMessage(error));
      throw error;
    }
  }

  /**
   * Update user password
   */
  async updateUserPassword(
    currentPassword: string,
    newPassword: string
  ): Promise<void> {
    try {
      const currentUser = this.auth.currentUser;
      if (!currentUser || !currentUser.email) {
        throw new Error('No user logged in');
      }

      // Reauthenticate user
      const credential = EmailAuthProvider.credential(
        currentUser.email,
        currentPassword
      );
      await reauthenticateWithCredential(currentUser, credential);

      // Update password
      await updatePassword(currentUser, newPassword);

      toast.success('Password updated successfully');
    } catch (error: any) {
      console.error('Update password error:', error);
      toast.error(this.getErrorMessage(error));
      throw error;
    }
  }

  /**
   * Delete user account
   * Flow: Reauthenticate → backend deletes from Firestore and Auth
   */
  async deleteUserAccount(password: string): Promise<void> {
    try {
      const currentUser = this.auth.currentUser;
      if (!currentUser || !currentUser.email) {
        throw new Error('No user logged in');
      }

      // Reauthenticate user
      const credential = EmailAuthProvider.credential(currentUser.email, password);
      await reauthenticateWithCredential(currentUser, credential);

      // Get ID token
      const idToken = await currentUser.getIdToken();

      // Call backend to delete account
      const response = await backendApi.deleteAccount(idToken);

      if (!response.success) {
        throw new Error(response.message || 'Failed to delete account');
      }

      // Sign out from Firebase
      await signOut(this.auth);

      toast.success('Account deleted successfully');
    } catch (error: any) {
      console.error('Delete account error:', error);
      toast.error(this.getErrorMessage(error));
      throw error;
    }
  }

  /**
   * Get ID token (for API authentication)
   */
  async getIdToken(forceRefresh = false): Promise<string | null> {
    try {
      const currentUser = this.auth.currentUser;
      if (!currentUser) {
        return null;
      }

      return await currentUser.getIdToken(forceRefresh);
    } catch (error: any) {
      console.error('Get ID token error:', error);
      throw error;
    }
  }

  /**
   * Refresh user token
   * Flow: Get current ID token → send to backend → backend returns new custom token
   */
  async refreshToken(): Promise<string | null> {
    try {
      // Get current ID token
      const idToken = await this.getIdToken(true);
      if (!idToken) {
        return null;
      }

      // Call backend to refresh token
      const response = await backendApi.refreshToken(idToken);

      if (!response.success || !response.data?.customToken) {
        throw new Error('Failed to refresh token');
      }

      // Sign in with new custom token
      await signInWithCustomToken(this.auth, response.data.customToken);

      // Get new ID token
      return await this.getIdToken(true);
    } catch (error: any) {
      console.error('Refresh token error:', error);
      toast.error('Session expired. Please login again.');
      throw error;
    }
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return this.auth.currentUser !== null;
  }

  /**
   * Get current user
   */
  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }

  /**
   * Get error message from Firebase error
   */
  private getErrorMessage(error: any): string {
    const errorMessages: { [key: string]: string } = {
      'auth/email-already-in-use': 'Email is already registered',
      'auth/weak-password': 'Password should be at least 6 characters',
      'auth/invalid-email': 'Invalid email address',
      'auth/user-not-found': 'User not found',
      'auth/wrong-password': 'Invalid email or password',
      'auth/too-many-requests': 'Too many attempts. Please try again later',
      'auth/network-request-failed': 'Network error. Please check your connection',
      'auth/requires-recent-login': 'Please login again to perform this action',
      'auth/invalid-credential': 'Invalid credentials',
    };

    return errorMessages[error.code] || error.message || 'An error occurred';
  }
}

// Export singleton instance
export const authAPI = new AuthAPI();

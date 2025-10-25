/**
 * Authentication Routes
 */

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  signup,
  login,
  logout,
  refreshToken,
  getProfile,
  updateProfile,
  resetPassword,
  verifyEmail,
  deleteAccount,
} = require('../controllers/authController');
const { verifyToken } = require('../middleware/authMiddleware');

// Validation rules
const signupValidation = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
];

const loginValidation = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

// Public routes
router.post('/signup', signupValidation, signup);
router.post('/login', loginValidation, login);
router.post('/refresh-token', refreshToken);
router.post('/reset-password', resetPassword);

// Protected routes
router.post('/logout', verifyToken, logout);
router.get('/profile', verifyToken, getProfile);
router.put('/profile', verifyToken, updateProfile);
router.post('/verify-email', verifyToken, verifyEmail);
router.delete('/account', verifyToken, deleteAccount);

module.exports = router;

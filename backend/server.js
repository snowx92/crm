/**
 * Server Entry Point
 *
 * This is the main server file that initializes the Express application
 * and connects to the database.
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/authRoutes');
const customerRoutes = require('./routes/customerRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const receiptRoutes = require('./routes/receiptRoutes');
const teamRoutes = require('./routes/teamRoutes');

// Initialize Express app
const app = express();

// Note: Using Firebase Admin SDK instead of MongoDB
console.log('🔥 Firebase Admin SDK initialized');

// Middleware
app.use(helmet()); // Security headers
app.use(compression()); // Compress responses
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(morgan('dev')); // Logging

// API Routes
const API_VERSION = process.env.API_VERSION || 'v1';

// All routes
app.use(`/api/${API_VERSION}/auth`, authRoutes);
app.use(`/api/${API_VERSION}/customers`, customerRoutes);
app.use(`/api/${API_VERSION}/services`, serviceRoutes);
app.use(`/api/${API_VERSION}/transactions`, transactionRoutes);
app.use(`/api/${API_VERSION}/expenses`, expenseRoutes);
app.use(`/api/${API_VERSION}/receipts`, receiptRoutes);
app.use(`/api/${API_VERSION}/team`, teamRoutes);

// Health Check Route
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Omena Agency CRM API is running',
    timestamp: new Date().toISOString(),
    version: API_VERSION
  });
});

// Welcome Route
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to Omena Agency CRM API',
    version: API_VERSION,
    documentation: `/api/${API_VERSION}/docs`,
    health: '/health'
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found'
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║      🔥 OMENA AGENCY CRM API SERVER (Firebase)           ║
║                                                           ║
║  Server is running on port ${PORT}                           ║
║  Environment: ${process.env.NODE_ENV || 'development'}                              ║
║  API Version: ${API_VERSION}                                       ║
║  Database: Firebase Firestore                            ║
║                                                           ║
║  Health Check: http://localhost:${PORT}/health              ║
║  Auth API: http://localhost:${PORT}/api/${API_VERSION}/auth        ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
  `);
});

module.exports = app;

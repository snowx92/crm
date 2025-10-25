/**
 * Firebase Admin SDK Configuration
 *
 * Initializes Firebase Admin for backend authentication and Firestore operations.
 */

const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Attempt to initialize Firebase Admin in a way that works both locally and in cloud
// Priority:
// 1. Use local service account file at backend/config/serviceAccountKey.json (recommended for local dev)
// 2. Use GOOGLE_APPLICATION_CREDENTIALS (Application Default Credentials)
// 3. Fall back to applicationDefault() (may try metadata server and fail outside GCP)

const serviceAccountPath = path.join(__dirname, 'serviceAccountKey.json');
try {
  if (fs.existsSync(serviceAccountPath)) {
    // Use explicit service account JSON when present
    const serviceAccount = require(serviceAccountPath);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: serviceAccount.project_id || process.env.GCLOUD_PROJECT || 'omena-crm',
    });
    console.log('Firebase Admin initialized using local serviceAccountKey.json');
  } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    // Use ADC if env var is provided
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      projectId: process.env.GCLOUD_PROJECT || 'omena-crm',
    });
    console.log('Firebase Admin initialized using GOOGLE_APPLICATION_CREDENTIALS ADC');
  } else {
    // Last resort: attempt applicationDefault() but warn that it may fail outside GCP
    console.warn('No serviceAccountKey.json found and GOOGLE_APPLICATION_CREDENTIALS is not set. Attempting applicationDefault() — this may fail when not running on GCP.');
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      projectId: process.env.GCLOUD_PROJECT || 'omena-crm',
    });
  }
} catch (err) {
  // If initialization fails, rethrow with a helpful message
  console.error('Failed to initialize Firebase Admin:', err.message || err);
  throw err;
}

// Export admin instance
const db = admin.firestore();
const auth = admin.auth();

module.exports = {
  admin,
  db,
  auth,
};

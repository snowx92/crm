/**
 * Firebase Configuration
 *
 * This file contains the complete Firebase configuration and initialization.
 * Includes: Authentication, Firestore Database, Storage, and Analytics.
 */

import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics, isSupported } from 'firebase/analytics';

// Firebase configuration object for Omena Agency CRM
const firebaseConfig = {
  apiKey: "AIzaSyCGi8h-c66SnwXLUSbFjX-RL-f6Kq7i0XA",
  authDomain: "omena-crm.firebaseapp.com",
  projectId: "omena-crm",
  storageBucket: "omena-crm.firebasestorage.app",
  messagingSenderId: "497007164869",
  appId: "1:497007164869:web:e5bfa144799ba5383d1fac",
  measurementId: "G-YFPHMEYD60"
};

// Initialize Firebase only if it hasn't been initialized yet
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Cloud Firestore Database
export const db = getFirestore(app);

// Initialize Firebase Storage for file uploads
export const storage = getStorage(app);

// Initialize Analytics (only in browser environment)
let analytics: any = null;
if (typeof window !== 'undefined') {
  isSupported().then(yes => {
    if (yes) {
      analytics = getAnalytics(app);
    }
  });
}

export { analytics };
export default app;

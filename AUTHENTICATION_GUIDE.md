# 🔐 Authentication Guide - Omena Agency CRM

Complete guide for using the Firebase-powered authentication system with API routes and Postman testing.

## 📋 Table of Contents

1. [Overview](#overview)
2. [Authentication Flow](#authentication-flow)
3. [API Endpoints](#api-endpoints)
4. [Using the Auth API](#using-the-auth-api)
5. [Postman Testing](#postman-testing)
6. [Security Best Practices](#security-best-practices)

---

## 🎯 Overview

The CRM uses **Firebase Authentication** with custom Next.js API routes for validation and additional features:

- ✅ **Email/Password Authentication**
- ✅ **Token-based Sessions** (JWT)
- ✅ **Automatic Token Refresh**
- ✅ **Email Verification**
- ✅ **Password Reset**
- ✅ **Profile Management**
- ✅ **Account Deletion**

---

## 🔄 Authentication Flow

### 1. Signup Flow

```
User → Next.js API → Firebase Auth → Firestore
  ↓         ↓            ↓             ↓
Input → Validation → Create User → Store Profile
```

**Steps:**
1. User submits signup form
2. API validates input (email format, password strength)
3. Firebase creates auth account
4. User profile created in Firestore `users` collection
5. Verification email sent
6. User receives ID token

### 2. Login Flow

```
User → Next.js API → Firebase Auth → Get Token
  ↓         ↓            ↓             ↓
Credentials → Validate → Authenticate → Return JWT
```

**Steps:**
1. User submits email/password
2. API validates input
3. Firebase authenticates user
4. Firestore updates `lastLogin` timestamp
5. Returns ID token (valid for 1 hour)

### 3. Token Refresh Flow

```
Token Expiring → Request Refresh → Firebase → New Token
```

**Steps:**
1. Client detects token will expire soon
2. Calls refresh-token endpoint
3. Firebase generates new token
4. Client stores new token

---

## 📡 API Endpoints

### Base URL
```
http://localhost:3000/api
```

### Authentication Endpoints

| Endpoint | Method | Auth Required | Description |
|----------|--------|---------------|-------------|
| `/auth/signup` | POST | No | Create new account |
| `/auth/login` | POST | No | Login to account |
| `/auth/logout` | POST | Yes | Logout current session |
| `/auth/refresh-token` | POST | No | Refresh auth token |
| `/auth/reset-password` | POST | No | Send password reset email |
| `/auth/verify-email` | POST | Yes | Send verification email |
| `/auth/profile` | GET | Yes | Get user profile |
| `/auth/profile` | PUT | Yes | Update user profile |
| `/auth/update-email` | PUT | Yes | Update email address |
| `/auth/update-password` | PUT | Yes | Update password |
| `/auth/delete-account` | DELETE | Yes | Delete account |

---

## 💻 Using the Auth API

### 1. Signup

```typescript
import { authAPI } from '@/lib/auth-api';

// Sign up new user
const signup = async () => {
  try {
    const result = await authAPI.signup({
      email: 'john@omena.com',
      password: 'SecurePassword123',
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '+1234567890',
      company: 'Omena Agency'
    });

    console.log('Signup successful:', result.user.uid);
  } catch (error) {
    console.error('Signup failed:', error);
  }
};
```

**Request Body:**
```json
{
  "email": "john@omena.com",
  "password": "SecurePassword123",
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "+1234567890",
  "company": "Omena Agency"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Account created successfully",
  "data": {
    "userId": "abc123...",
    "email": "john@omena.com",
    "idToken": "eyJhbGciOiJSUzI1NiIs...",
    "emailVerified": false
  }
}
```

### 2. Login

```typescript
import { authAPI } from '@/lib/auth-api';

const login = async () => {
  try {
    const result = await authAPI.login({
      email: 'john@omena.com',
      password: 'SecurePassword123',
      rememberMe: true
    });

    // Store token
    localStorage.setItem('authToken', await result.user.getIdToken());
  } catch (error) {
    console.error('Login failed:', error);
  }
};
```

**Request Body:**
```json
{
  "email": "john@omena.com",
  "password": "SecurePassword123",
  "rememberMe": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "userId": "abc123...",
    "email": "john@omena.com",
    "idToken": "eyJhbGciOiJSUzI1NiIs...",
    "displayName": "John Doe"
  }
}
```

### 3. Refresh Token

```typescript
import { authAPI } from '@/lib/auth-api';

const refreshToken = async () => {
  try {
    const newToken = await authAPI.refreshToken();
    localStorage.setItem('authToken', newToken);
  } catch (error) {
    // Token refresh failed - logout user
    await authAPI.logout();
  }
};

// Auto-refresh every 50 minutes
setInterval(refreshToken, 50 * 60 * 1000);
```

### 4. Password Reset

```typescript
import { authAPI } from '@/lib/auth-api';

const resetPassword = async () => {
  try {
    await authAPI.resetPassword('john@omena.com');
    // User will receive email with reset link
  } catch (error) {
    console.error('Password reset failed:', error);
  }
};
```

### 5. Update Profile

```typescript
import { authAPI } from '@/lib/auth-api';
import { auth } from '@/lib/firebase';

const updateProfile = async () => {
  const user = auth.currentUser;
  if (!user) return;

  try {
    await authAPI.updateUserProfile(user.uid, {
      firstName: 'John',
      lastName: 'Smith',
      phoneNumber: '+1987654321',
      company: 'New Company'
    });
  } catch (error) {
    console.error('Update failed:', error);
  }
};
```

### 6. Get ID Token (for API calls)

```typescript
import { authAPI } from '@/lib/auth-api';

const makeAuthenticatedRequest = async () => {
  // Get current user's ID token
  const token = await authAPI.getIdToken();

  // Use in API requests
  const response = await fetch('/api/customers', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};
```

---

## 🧪 Postman Testing

### Setup

1. Import `Omena_Agency_CRM_API.postman_collection.json`
2. The collection has 12 authentication endpoints ready to test
3. Variables auto-update after successful requests

### Test Flow

#### 1. Create Account

**Endpoint:** `POST /api/auth/signup`

**Body:**
```json
{
  "email": "test@omena.com",
  "password": "Test123456",
  "firstName": "Test",
  "lastName": "User"
}
```

**Auto-saves:**
- `authToken` - JWT token
- `userId` - User ID

#### 2. Login

**Endpoint:** `POST /api/auth/login`

**Body:**
```json
{
  "email": "test@omena.com",
  "password": "Test123456"
}
```

**Auto-updates:** `authToken`

#### 3. Get Profile

**Endpoint:** `GET /api/auth/profile`

**Headers:**
```
Authorization: Bearer {{authToken}}
```

Returns user profile data

#### 4. Refresh Token

**Endpoint:** `POST /api/auth/refresh-token`

**Body:**
```json
{
  "idToken": "{{authToken}}"
}
```

**Auto-updates:** `authToken` with new token

#### 5. Update Profile

**Endpoint:** `PUT /api/auth/profile`

**Headers:**
```
Authorization: Bearer {{authToken}}
```

**Body:**
```json
{
  "firstName": "Updated",
  "lastName": "Name"
}
```

#### 6. Logout

**Endpoint:** `POST /api/auth/logout`

**Headers:**
```
Authorization: Bearer {{authToken}}
```

### Testing Tips

1. **Test Signup First** - Creates account and saves token
2. **Use Variables** - `{{authToken}}` and `{{userId}}` auto-populate
3. **Test in Order** - Follow the "Complete Auth Flow" folder
4. **Check Responses** - Tokens auto-save via test scripts
5. **Reset Password** - Use separate email for testing

---

## 🔒 Security Best Practices

### 1. Token Management

```typescript
// Store token securely
const storeToken = (token: string) => {
  // Use httpOnly cookie in production
  document.cookie = `authToken=${token}; secure; samesite=strict`;
};

// Auto-refresh before expiry
const setupAutoRefresh = () => {
  setInterval(async () => {
    const newToken = await authAPI.refreshToken();
    storeToken(newToken);
  }, 50 * 60 * 1000); // 50 minutes
};
```

### 2. Password Requirements

- ✅ Minimum 6 characters (Firebase requirement)
- ✅ Recommended: 8+ characters
- ✅ Mix of letters, numbers, symbols
- ✅ No common passwords

### 3. Email Verification

```typescript
// Check if email is verified
if (!user.emailVerified) {
  await authAPI.sendVerificationEmail();
  // Show banner: "Please verify your email"
}
```

### 4. Session Management

```typescript
// Logout on multiple tabs
window.addEventListener('storage', (e) => {
  if (e.key === 'authToken' && !e.newValue) {
    // Token removed - logout
    authAPI.logout();
  }
});
```

### 5. Error Handling

```typescript
try {
  await authAPI.login(credentials);
} catch (error: any) {
  switch (error.code) {
    case 'auth/user-not-found':
      // Show: User not found
      break;
    case 'auth/wrong-password':
      // Show: Invalid password
      break;
    case 'auth/too-many-requests':
      // Show: Too many attempts
      break;
    default:
      // Show: Generic error
  }
}
```

---

## 📊 Token Lifecycle

```
Login
  ↓
Token Created (valid 1 hour)
  ↓
Use Token (45 minutes)
  ↓
Auto-Refresh (50 minutes) → New Token
  ↓
Continue Using
  ↓
Logout → Token Invalidated
```

---

## 🔧 Configuration

### Firebase Settings

File: `src/lib/firebase.ts`

```typescript
const firebaseConfig = {
  apiKey: "AIzaSyCGi8h-c66SnwXLUSbFjX-RL-f6Kq7i0XA",
  authDomain: "omena-crm.firebaseapp.com",
  projectId: "omena-crm",
  // ... other config
};
```

### API Routes

Location: `src/app/api/auth/`

All routes return standard format:
```json
{
  "success": true | false,
  "message": "Description",
  "data": { /* response data */ },
  "error": "Error message if failed"
}
```

---

## 🆘 Troubleshooting

### Token Expired

**Error:** `auth/id-token-expired`

**Solution:**
```typescript
const newToken = await authAPI.refreshToken();
```

### Email Already in Use

**Error:** `auth/email-already-in-use`

**Solution:** User should login instead of signup

### Weak Password

**Error:** `auth/weak-password`

**Solution:** Use password with 6+ characters

### Network Error

**Error:** `auth/network-request-failed`

**Solution:** Check internet connection

### Unauthorized

**Error:** `401 Unauthorized`

**Solution:** Token missing or invalid - re-login

---

## 📚 Resources

- [Firebase Auth Docs](https://firebase.google.com/docs/auth)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)

---

**Built with 🔥 Firebase & 🔐 Security First**

© 2024 Omena Agency

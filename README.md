# Omena Agency CRM

A modern Customer Relationship Management (CRM) system built for digital agencies. Features a stunning Next.js frontend with Express.js backend, powered by Firebase Authentication, Firestore Database, and Cloud Storage.

**🔥 Full-stack application with Firebase integration!**

## 🎯 Features

### Frontend
- **Modern Next.js 14** with App Router and TypeScript
- **Stunning UI** with Tailwind CSS and Framer Motion animations
- **Fully Responsive** design for all devices
- **Animated Sidebar** navigation with smooth transitions
- **Beautiful Login Page** with gradient backgrounds and glass morphism

### Backend
- **Express.js** RESTful API server
- **Firebase Admin SDK** for server-side authentication
- **Token-based authentication** with custom tokens
- **Input validation** with express-validator
- **CORS enabled** for frontend integration
- **Comprehensive API endpoints** for all authentication operations

### Firebase Services
- 🔐 **Authentication** - Email/password with backend validation
- 📊 **Firestore** - Real-time NoSQL database for all CRM data
- 📁 **Storage** - Secure file uploads with size/type validation
- 📈 **Analytics** - Track user engagement and app usage
- ⚡ **Real-time Updates** - Data syncs automatically across all clients

### Managed Entities (Firestore Collections)
- 👥 **Customers** - Complete customer management with real-time updates
- 💼 **Services** - Agency service catalog
- 💰 **Transactions** - Financial transaction tracking
- 📊 **Expenses** - Business expense management with receipt uploads
- 👨‍💼 **Team Members** - Employee and team management with avatars
- 🧾 **Receipts** - Invoice and receipt generation with PDF storage

## 🎨 Branding Colors

- **Primary**: #272860 (Deep Navy Blue)
- **Secondary**: #f8c800 (Golden Yellow)
- **Accent**: #fff (White)

## 📁 Project Structure

```
crm/
├── frontend/                     # Next.js application
│   ├── src/
│   │   ├── app/                 # Next.js app router pages
│   │   │   ├── dashboard/       # Dashboard pages
│   │   │   ├── login/           # Login page
│   │   │   └── ...
│   │   ├── components/          # Reusable components
│   │   ├── lib/                 # Firebase & utilities
│   │   │   ├── firebase.ts      # Firebase client SDK
│   │   │   ├── firestore.ts     # Firestore services
│   │   │   ├── storage.ts       # Storage services
│   │   │   ├── auth-api.ts      # Authentication API
│   │   │   ├── backend-api.ts   # Backend API client
│   │   │   └── AuthContext.tsx  # Auth provider
│   │   ├── hooks/               # Custom React hooks
│   │   │   └── useFirestore.ts  # Firestore hooks
│   │   └── ...
│   └── package.json
│
├── backend/                      # Express.js backend
│   ├── config/                  # Configuration
│   │   └── firebase-admin.js    # Firebase Admin SDK
│   ├── controllers/             # Business logic
│   │   └── authController.js    # Auth controller
│   ├── middleware/              # Express middleware
│   │   └── authMiddleware.js    # Token verification
│   ├── routes/                  # API routes
│   │   └── authRoutes.js        # Auth routes
│   ├── server.js                # Express server
│   └── package.json
│
├── firestore.rules              # Firestore security rules
├── storage.rules                # Storage security rules
├── FIREBASE_SETUP.md            # Complete Firebase setup guide
├── AUTHENTICATION_GUIDE.md      # Authentication API docs
└── README.md                    # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Firebase account (free tier works great!)
- Web browser

### Quick Start (10 minutes!)

#### 1. Install Dependencies

**Frontend:**
```bash
cd frontend
npm install
```

**Backend:**
```bash
cd backend
npm install
```

#### 2. Firebase Setup

The Firebase project is already configured! Just follow these steps:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Your project **"omena-crm"** should already exist
3. **Enable Authentication**:
   - Go to Authentication → Get Started
   - Enable Email/Password provider
4. **Create Firestore Database**:
   - Go to Firestore Database → Create Database
   - Select location → Next
   - Start in production mode → Create
   - Go to Rules tab → Copy from `firestore.rules` file → Publish
5. **Enable Storage**:
   - Go to Storage → Get Started
   - Click Next → Done
   - Go to Rules tab → Copy from `storage.rules` file → Publish
6. **Setup Service Account** (for backend):
   - Go to Project Settings → Service Accounts
   - Click "Generate New Private Key"
   - Save as `backend/config/serviceAccountKey.json`
   - OR use: `gcloud auth application-default login`

📖 **Detailed guide**: See [FIREBASE_SETUP.md](FIREBASE_SETUP.md)

#### 3. Configure Environment Variables

**Frontend** (`frontend/.env.local`):
```bash
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000/api/v1
```

**Backend** (`backend/.env`):
```bash
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

#### 4. Start Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

#### 5. Open in Browser

Navigate to [http://localhost:3000](http://localhost:3000)

#### 6. Create Account & Login

- Click "Sign Up" or use the login page
- Enter email: `admin@omena.com`
- Enter password: `password123` (min 6 characters)
- Fill in your name and details
- Click Sign Up → Account created and logged in automatically!

## 🔐 Authentication Flow

The application uses a **hybrid authentication system** combining Firebase Client SDK with Express backend validation:

### Signup Flow
1. User enters credentials on frontend
2. Frontend calls backend API `/auth/signup`
3. Backend creates user in Firebase Auth using Admin SDK
4. Backend creates user profile in Firestore
5. Backend generates **custom token**
6. Frontend receives custom token and signs in with Firebase
7. User is authenticated and redirected to dashboard

### Login Flow
1. User enters credentials on frontend
2. Frontend signs in with Firebase Client SDK
3. Frontend gets **ID token** from Firebase
4. Frontend sends ID token to backend `/auth/login`
5. Backend verifies ID token with Firebase Admin SDK
6. Backend updates last login timestamp
7. Backend returns success response
8. User is authenticated and redirected to dashboard

### Token Refresh Flow
1. Frontend detects token expiration
2. Frontend gets current ID token
3. Frontend calls backend `/auth/refresh-token`
4. Backend verifies token and generates new custom token
5. Frontend signs in with new custom token
6. Authentication refreshed seamlessly

### Protected Routes
All protected API endpoints require **Bearer token** (ID token) in Authorization header:
```
Authorization: Bearer <firebase-id-token>
```

Backend middleware verifies the token using Firebase Admin SDK before processing requests.

📖 **Full API documentation**: See [AUTHENTICATION_GUIDE.md](AUTHENTICATION_GUIDE.md)

## 🔥 Firebase Configuration

The app is pre-configured with your Firebase credentials:

```javascript
// Already configured in src/lib/firebase.ts (Client SDK)
{
  apiKey: "AIzaSyCGi8h-c66SnwXLUSbFjX-RL-f6Kq7i0XA",
  authDomain: "omena-crm.firebaseapp.com",
  projectId: "omena-crm",
  storageBucket: "omena-crm.firebasestorage.app",
  messagingSenderId: "497007164869",
  appId: "1:497007164869:web:e5bfa144799ba5383d1fac",
  measurementId: "G-YFPHMEYD60"
}
```

## 🔌 Backend API Endpoints

Base URL: `http://localhost:5000/api/v1`

### Authentication Endpoints
- `POST /auth/signup` - Create new user account
- `POST /auth/login` - Login with ID token
- `POST /auth/refresh-token` - Refresh authentication token
- `POST /auth/logout` - Revoke refresh tokens
- `GET /auth/profile` - Get user profile (protected)
- `PUT /auth/profile` - Update user profile (protected)
- `POST /auth/reset-password` - Send password reset email
- `POST /auth/verify-email` - Send verification email (protected)
- `DELETE /auth/account` - Delete user account (protected)

### Testing with Postman
Import the collection: [Omena_Agency_CRM_API.postman_collection.json](Omena_Agency_CRM_API.postman_collection.json)

The collection includes:
- All authentication endpoints
- Auto-save scripts for tokens
- Complete authentication flow examples
- Environment variables setup

## 📊 Using Firestore Services

### React Hooks (Real-time)

```typescript
import { useCustomers, useServices } from '@/hooks/useFirestore';

function MyComponent() {
  // Get all customers with real-time updates
  const { data: customers, loading, error } = useCustomers();

  // Get all services
  const { data: services } = useServices();

  return <div>{/* Use data */}</div>;
}
```

### Direct Service Calls

```typescript
import {
  customersService,
  servicesService,
  transactionsService
} from '@/lib/firestore';

// Create customer
const customerId = await customersService.create({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  status: 'active'
});

// Get all customers
const customers = await customersService.getAll();

// Update customer
await customersService.update(customerId, {
  status: 'inactive'
});

// Delete customer
await customersService.delete(customerId);
```

## 📁 File Uploads with Firebase Storage

```typescript
import { storageService } from '@/lib/storage';

// Upload receipt
const receiptUrl = await storageService.uploadReceipt(file, receiptId);

// Upload expense receipt
const expenseUrl = await storageService.uploadExpenseReceipt(file, expenseId);

// Upload team member avatar
const avatarUrl = await storageService.uploadAvatar(file, userId);

// Upload with progress tracking
const url = await storageService.uploadFileWithProgress(
  file,
  'receipts',
  (progress) => console.log(`Upload progress: ${progress}%`)
);

// Delete file
await storageService.deleteFile(fileUrl);
```

## 🔐 Security Rules

### Firestore Rules

All authenticated users can read/write data. Deploy using:

```bash
firebase deploy --only firestore:rules
```

Or copy from `firestore.rules` in Firebase Console.

### Storage Rules

File uploads have:
- Size limits (5-20MB depending on type)
- File type restrictions (images, PDFs)
- Authentication required

Deploy using:

```bash
firebase deploy --only storage:rules
```

## 🎭 Dashboard Pages

- ✅ **Dashboard** - Overview with stats and recent activity
- ⏳ **Services** - Coming soon (Firestore-ready)
- ⏳ **Team Members** - Coming soon (with avatar uploads)
- ⏳ **Expenses** - Coming soon (with receipt uploads)
- ⏳ **Transactions** - Coming soon (real-time updates)
- ⏳ **Receipts** - Coming soon (with PDF generation)
- ⏳ **Customers** - Coming soon (full CRUD)
- ⏳ **Settings** - Coming soon

## 🛠️ Built With

### Frontend
- [Next.js 14](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Lucide React](https://lucide.dev/) - Icons
- [React Hot Toast](https://react-hot-toast.com/) - Notifications

### Backend
- [Express.js](https://expressjs.com/) - Web framework
- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup) - Server-side Firebase
- [express-validator](https://express-validator.github.io/) - Input validation
- [CORS](https://www.npmjs.com/package/cors) - Cross-origin requests

### Firebase Services
- [Firebase Auth](https://firebase.google.com/products/auth) - Authentication
- [Cloud Firestore](https://firebase.google.com/products/firestore) - Database
- [Firebase Storage](https://firebase.google.com/products/storage) - File storage
- [Firebase Analytics](https://firebase.google.com/products/analytics) - Analytics

## 💰 Firebase Pricing

### Free Tier (Spark Plan) - Perfect for Development!
- ✅ **Auth**: 10K verifications/month
- ✅ **Firestore**: 1GB storage, 50K reads/day, 20K writes/day
- ✅ **Storage**: 5GB storage, 1GB downloads/month
- ✅ **Analytics**: Unlimited

### Paid Tier (Blaze - Pay as you go)
- Only pay for what you use beyond free tier
- Typically $25-100/month for small business

[View Pricing Details](https://firebase.google.com/pricing)

## 📖 Documentation

- 📄 [FIREBASE_SETUP.md](FIREBASE_SETUP.md) - Complete Firebase setup guide
- 📄 [AUTHENTICATION_GUIDE.md](AUTHENTICATION_GUIDE.md) - Authentication API documentation
- 📄 [QUICK_START.md](QUICK_START.md) - Quick start guide
- 📄 [FIREBASE_MIGRATION_SUMMARY.md](FIREBASE_MIGRATION_SUMMARY.md) - Migration details
- 📄 [Postman Collection](Omena_Agency_CRM_API.postman_collection.json) - API testing collection

## 🚀 Deployment

### Deploy Backend (Railway/Heroku/DigitalOcean)

**Railway (Recommended):**
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login and deploy
cd backend
railway login
railway init
railway up
```

**Environment Variables (Backend):**
- `NODE_ENV=production`
- `PORT=5000`
- `FRONTEND_URL=https://your-frontend-url.com`
- `GOOGLE_APPLICATION_CREDENTIALS` or use service account JSON

### Deploy Frontend (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel
```

**Environment Variables (Frontend):**
- `NEXT_PUBLIC_BACKEND_URL=https://your-backend-url.com/api/v1`

Or connect your GitHub repository to Vercel for automatic deployments.

### Deploy Firebase Security Rules

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Deploy rules
firebase deploy --only firestore:rules,storage:rules
```

## 🎯 Architecture Overview

### Frontend ↔ Backend ↔ Firebase

```
Next.js Frontend
    ↓ (HTTP requests with ID tokens)
Express Backend
    ↓ (Firebase Admin SDK)
Firebase Services (Auth, Firestore, Storage)
```

### Why Hybrid Architecture?

**Benefits of Express Backend:**
- ✅ **Centralized validation** - Input validation before Firebase
- ✅ **Business logic control** - Server-side processing
- ✅ **Custom token generation** - Enhanced security
- ✅ **API flexibility** - Easy to extend with custom endpoints
- ✅ **Logging & monitoring** - Centralized request tracking
- ✅ **Rate limiting** - Prevent abuse at API level

**Benefits of Firebase:**
- ✅ **Real-time updates** - Data syncs automatically on frontend
- ✅ **Automatic scaling** - Firebase handles growth
- ✅ **Built-in security** - Firestore security rules
- ✅ **File storage included** - No separate setup needed
- ✅ **Free tier generous** - Great for development
- ✅ **Offline support** - Works without connection

### 📊 Data Structure

Firestore collections (same as MongoDB structure):
- Better real-time capabilities
- Automatic ID generation
- Timestamp handling built-in
- NoSQL flexibility

## 🆘 Troubleshooting

### Backend Won't Start
- Check `GOOGLE_APPLICATION_CREDENTIALS` environment variable
- Or run `
Signup error: FirebaseAppError: Credential implementation provided to initializeApp() via the "credential" property failed to fetch a valid Google OAuth2 access token with the following error: "Error fetching access token: Error while making request: getaddrinfo ENOTFOUND metadata.google.internal. Error code: ENOTFOUND".
    at D:\orizon\crm\backend\node_modules\firebase-admin\lib\app\firebase-app.js:87:19
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
    at async exports.signup (D:\orizon\crm\backend\controllers\authController.js:30:24) {
  errorInfo: {
    code: 'app/invalid-credential',
    message: 'Credential implementation provided to initializeApp() via the "credential" property failed to fetch a valid Google OAuth2 access token with the following error: "Error fetching access token: Error while making request: getaddrinfo ENOTFOUND metadata.google.internal. Error code: ENOTFOUND".'
  },
  codePrefix: 'app'
}
POST /api/v1/auth/signup 500 58.034 ms - 83`
- Verify Firebase project ID matches
- Check port 5000 is not in use

### Frontend Can't Connect to Backend
- Verify backend is running on port 5000
- Check `.env.local` has correct `NEXT_PUBLIC_BACKEND_URL`
- Check CORS settings in backend
- Open browser console for errors

### Firebase Permission Denied
- Check Firestore rules are published
- Verify user is authenticated
- Check browser console for errors
- Verify backend has Firebase Admin credentials

### Authentication Fails
- Verify Email/Password auth is enabled in Firebase Console
- Password must be 6+ characters
- Check backend is receiving requests
- Check browser network tab for API errors

### File Upload Fails
- Check file size (must be under limits)
- Verify file type is allowed
- Check Storage rules are published
- Verify user is authenticated

### Token Expired Errors
- Token refresh should happen automatically
- Check network connectivity
- Clear browser cache and cookies
- Try logging out and back in

## 📚 Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Guide](https://firebase.google.com/docs/firestore)
- [Storage Guide](https://firebase.google.com/docs/storage)
- [Auth Guide](https://firebase.google.com/docs/auth)
- [Next.js Documentation](https://nextjs.org/docs)

## 📝 License

This project is private and proprietary to Omena Agency.

---

**Built with ❤️ and 🔥 Firebase**

© 2024 Omena Agency. All rights reserved.

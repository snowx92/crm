# 🔥 Firebase Setup Guide - Omena Agency CRM

This CRM uses **Firebase** for everything:
- ✅ **Authentication** - User login/signup
- ✅ **Firestore** - NoSQL database for all data
- ✅ **Storage** - File uploads (receipts, avatars, documents)
- ✅ **Analytics** - Usage tracking

**No MongoDB or separate backend needed!** Everything runs on Firebase.

---

## 📋 Prerequisites

- Google account
- Web browser
- 10 minutes of your time

---

## 🚀 Step-by-Step Firebase Setup

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or **"Create a project"**
3. Enter project name: **"Omena CRM"** (or your choice)
4. Click **Continue**
5. **Enable Google Analytics** (recommended) → Click **Continue**
6. Select or create Analytics account → Click **Create project**
7. Wait for project creation (30 seconds)
8. Click **Continue**

### Step 2: Register Web App

1. In Firebase Console, click the **web icon** `</>`
2. Enter app nickname: **"Omena CRM Web"**
3. ✅ Check **"Also set up Firebase Hosting"** (optional)
4. Click **Register app**
5. **Copy the firebaseConfig object** - you'll need this later
6. Click **Continue to console**

**Note**: The credentials are already configured in this project:
```javascript
apiKey: "AIzaSyCGi8h-c66SnwXLUSbFjX-RL-f6Kq7i0XA"
authDomain: "omena-crm.firebaseapp.com"
projectId: "omena-crm"
storageBucket: "omena-crm.firebasestorage.app"
messagingSenderId: "497007164869"
appId: "1:497007164869:web:e5bfa144799ba5383d1fac"
```

### Step 3: Enable Authentication

1. In left sidebar, click **🔐 Authentication**
2. Click **Get started**
3. Click on **Email/Password** provider
4. Toggle **Enable** switch ON
5. Toggle **Email link (passwordless sign-in)** OFF (optional)
6. Click **Save**

**Done!** Users can now sign up and log in with email/password.

### Step 4: Create Firestore Database

1. In left sidebar, click **🔥 Firestore Database**
2. Click **Create database**
3. **Select location**: Choose closest to your users (e.g., `us-central1`)
4. Click **Next**
5. **Security rules**: Select **"Start in production mode"**
6. Click **Create**
7. Wait for database creation (30 seconds)

**Important**: We'll update security rules in Step 6.

### Step 5: Enable Storage

1. In left sidebar, click **📦 Storage**
2. Click **Get started**
3. **Security rules**: Click **Next** (we'll update later)
4. **Storage location**: Same as Firestore (should auto-select)
5. Click **Done**

**Done!** File uploads are now enabled.

### Step 6: Deploy Security Rules

#### Firestore Rules

1. In **Firestore Database**, click **Rules** tab
2. Replace all content with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isAuthenticated() {
      return request.auth != null;
    }

    match /customers/{customerId} {
      allow read, write: if isAuthenticated();
    }

    match /services/{serviceId} {
      allow read, write: if isAuthenticated();
    }

    match /transactions/{transactionId} {
      allow read, write: if isAuthenticated();
    }

    match /expenses/{expenseId} {
      allow read, write: if isAuthenticated();
    }

    match /teamMembers/{memberId} {
      allow read, write: if isAuthenticated();
    }

    match /receipts/{receiptId} {
      allow read, write: if isAuthenticated();
    }

    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

3. Click **Publish**

#### Storage Rules

1. In **Storage**, click **Rules** tab
2. Replace all content with:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    function isAuthenticated() {
      return request.auth != null;
    }

    function isValidSize(maxSizeMB) {
      return request.resource.size < maxSizeMB * 1024 * 1024;
    }

    function isImage() {
      return request.resource.contentType.matches('image/.*');
    }

    function isPDF() {
      return request.resource.contentType == 'application/pdf';
    }

    match /receipts/{receiptFile} {
      allow read: if isAuthenticated();
      allow write: if isAuthenticated() && isValidSize(10) && (isPDF() || isImage());
    }

    match /expenses/{expenseFile} {
      allow read: if isAuthenticated();
      allow write: if isAuthenticated() && isValidSize(10) && (isPDF() || isImage());
    }

    match /avatars/{avatarFile} {
      allow read: if isAuthenticated();
      allow write: if isAuthenticated() && isValidSize(5) && isImage();
    }

    match /documents/{documentFile} {
      allow read: if isAuthenticated();
      allow write: if isAuthenticated() && isValidSize(20);
    }

    match /{allPaths=**} {
      allow read, write: if false;
    }
  }
}
```

3. Click **Publish**

### Step 7: Enable Analytics (Optional)

Analytics is already enabled if you selected it during project creation!

To view analytics:
1. Click **⚡ Analytics** in left sidebar
2. View dashboard, events, and user properties

---

## ✅ Firebase Setup Complete!

Your Firebase project is now ready. The CRM will automatically:
- Authenticate users
- Store data in Firestore
- Upload files to Storage
- Track usage with Analytics

---

## 🚀 Run the Application

### Install Dependencies

```bash
cd frontend
npm install
```

### Start Development Server

```bash
npm run dev
```

### Open in Browser

Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🧪 Test the Setup

### 1. Test Authentication

1. Go to login page
2. Enter any email: `admin@omena.com`
3. Enter password: `password123` (min 6 characters)
4. Click **Sign In**
5. Account will be created automatically!

### 2. Check Firebase Console

1. Go to **Authentication** → **Users**
2. You should see your newly created user!

### 3. Test Data Storage (Coming in Phase 2)

Once you build the customer management page:
1. Create a customer
2. Check **Firestore Database** → **customers** collection
3. Data appears in real-time!

### 4. Test File Upload (Coming in Phase 2)

Once you build file upload features:
1. Upload a receipt
2. Check **Storage** → **receipts** folder
3. File appears instantly!

---

## 📊 Firestore Collections Structure

Your database will have these collections:

```
firestore/
├── customers/          # Customer data
├── services/           # Service catalog
├── transactions/       # Financial transactions
├── expenses/           # Business expenses
├── teamMembers/        # Team/employees
└── receipts/           # Invoices & receipts
```

Each document automatically gets:
- `id` - Unique identifier
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

---

## 🔐 Security Best Practices

### ✅ Current Setup (Good for Development)

- Users must be authenticated to access data
- All authenticated users can read/write
- File size limits enforced
- File type restrictions for uploads

### 🔒 Production Recommendations

1. **Add Role-Based Access Control**
   ```javascript
   // Only admins can delete
   allow delete: if isAuthenticated() &&
     get(/databases/$(database)/documents/teamMembers/$(request.auth.uid)).data.role == 'admin';
   ```

2. **Add Field-Level Validation**
   ```javascript
   // Ensure required fields
   allow create: if request.resource.data.keys().hasAll(['firstName', 'lastName', 'email']);
   ```

3. **Limit Query Size**
   ```javascript
   // Prevent large queries
   allow list: if isAuthenticated() && request.query.limit <= 100;
   ```

4. **Add Data Ownership**
   ```javascript
   // Users can only edit their own data
   allow update: if request.auth.uid == resource.data.userId;
   ```

---

## 💰 Firebase Pricing

### Free Tier (Spark Plan)
- ✅ **Authentication**: 10K verifications/month
- ✅ **Firestore**: 1GB storage, 50K reads/day
- ✅ **Storage**: 5GB storage, 1GB downloads/month
- ✅ **Analytics**: Unlimited

**Perfect for development and small businesses!**

### Paid Tier (Blaze Plan - Pay as you go)
- Only pay for what you use
- No monthly fee if under free tier limits
- Typically $25-100/month for small business

[View Detailed Pricing](https://firebase.google.com/pricing)

---

## 🛠️ Useful Firebase CLI Commands

### Install Firebase Tools

```bash
npm install -g firebase-tools
```

### Login to Firebase

```bash
firebase login
```

### Initialize Project

```bash
firebase init
```

Select:
- ✅ Firestore
- ✅ Storage
- ✅ Hosting (optional)

### Deploy Rules

```bash
# Deploy Firestore rules
firebase deploy --only firestore:rules

# Deploy Storage rules
firebase deploy --only storage:rules

# Deploy everything
firebase deploy
```

### Emulators (Local Testing)

```bash
firebase emulators:start
```

This starts local emulators for:
- Authentication
- Firestore
- Storage

---

## 📚 Firebase Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Guide](https://firebase.google.com/docs/firestore)
- [Storage Guide](https://firebase.google.com/docs/storage)
- [Auth Guide](https://firebase.google.com/docs/auth)
- [Security Rules](https://firebase.google.com/docs/rules)

---

## 🆘 Troubleshooting

### Issue: "Permission Denied" Error

**Solution**: Check Firestore/Storage rules are published

### Issue: User Can't Login

**Solutions**:
- Verify Email/Password auth is enabled
- Check password is 6+ characters
- Clear browser cache

### Issue: Data Not Saving

**Solutions**:
- Check Firestore rules allow write
- Verify user is authenticated
- Check browser console for errors

### Issue: File Upload Fails

**Solutions**:
- Check file size limits
- Verify file type is allowed
- Check Storage rules

### Issue: Analytics Not Working

**Solution**: Analytics only works in production (not localhost)

---

## 🎯 Next Steps

1. ✅ Firebase is configured
2. ✅ Run the app: `npm run dev`
3. ✅ Create an account and login
4. 🔄 Start building Phase 2 features (customer management, etc.)
5. 🔄 Deploy to production

---

**Setup Time**: ~15 minutes
**Cost**: $0 (free tier)
**Complexity**: ⭐⭐ (Easy)

🎉 **You're all set! Happy coding!**

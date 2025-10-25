# Omena Agency CRM - Frontend

Modern Next.js frontend for the Omena Agency CRM with beautiful animations and Firebase authentication.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local

# Configure Firebase credentials in .env.local

# Start development server
npm run dev

# Open http://localhost:3000
```

## 🎨 Features

- ✨ Beautiful animated login page
- 📊 Interactive dashboard with statistics
- 🎭 Smooth sidebar navigation
- 📱 Fully responsive design
- 🔐 Firebase authentication
- 🎨 Custom Tailwind theme with Omena colors
- ⚡ Fast page transitions
- 🌙 Professional design aesthetic

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── dashboard/         # Dashboard pages
│   │   │   ├── page.tsx       # Main dashboard
│   │   │   ├── services/      # Services page
│   │   │   ├── team/          # Team page
│   │   │   ├── expenses/      # Expenses page
│   │   │   ├── transactions/  # Transactions page
│   │   │   ├── receipts/      # Receipts page
│   │   │   ├── customers/     # Customers page
│   │   │   ├── settings/      # Settings page
│   │   │   └── layout.tsx     # Dashboard layout
│   │   ├── login/             # Login page
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home redirect
│   │   └── globals.css        # Global styles
│   ├── components/            # Reusable components
│   │   ├── Sidebar.tsx        # Navigation sidebar
│   │   └── ComingSoon.tsx     # Coming soon page
│   ├── lib/                   # Core utilities
│   │   ├── firebase.ts        # Firebase config
│   │   └── AuthContext.tsx    # Auth provider
│   ├── utils/                 # Helper functions
│   │   └── cn.ts              # Class name merger
│   └── ...
├── public/                    # Static assets
├── tailwind.config.ts         # Tailwind configuration
├── next.config.js             # Next.js configuration
├── tsconfig.json              # TypeScript config
└── package.json               # Dependencies
```

## 🎨 Branding Colors

```typescript
// Defined in tailwind.config.ts
colors: {
  primary: {
    DEFAULT: '#272860',  // Deep Navy Blue
    dark: '#1a1a40',
    light: '#353570',
  },
  secondary: {
    DEFAULT: '#f8c800',  // Golden Yellow
    dark: '#d4ab00',
    light: '#ffd633',
  },
  accent: {
    DEFAULT: '#fff',     // White
    dark: '#f5f5f5',
  },
}
```

## 🔧 Configuration

### Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### Firebase Setup

1. Create project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication → Email/Password
3. Copy credentials to `.env.local`
4. Done! Authentication works automatically

## 📄 Pages

### Login Page (`/login`)
- Beautiful gradient background
- Animated elements
- Glass morphism card
- Firebase email/password auth
- Form validation
- Responsive design

### Dashboard (`/dashboard`)
- Statistics cards with trends
- Recent activity feed
- Quick actions panel
- Animated components
- Responsive grid layout

### Coming Soon Pages
All feature pages include:
- Custom icon
- Animated entrance
- Professional messaging
- "Notify me" button
- Consistent design

Pages:
- `/dashboard/services` - Services Management
- `/dashboard/team` - Team Members
- `/dashboard/expenses` - Expense Tracking
- `/dashboard/transactions` - Transaction History
- `/dashboard/receipts` - Receipts Management
- `/dashboard/customers` - Customer Management
- `/dashboard/settings` - Settings & Configuration

## 🎭 Components

### Sidebar
**Location:** `src/components/Sidebar.tsx`

Features:
- Collapsible on mobile
- Active route highlighting
- User profile section
- Animated menu items
- Logout functionality

### ComingSoon
**Location:** `src/components/ComingSoon.tsx`

Props:
```typescript
interface ComingSoonProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}
```

## 🎨 Styling

### Tailwind Utilities

Custom classes in `globals.css`:

```css
.btn-primary        /* Primary button */
.btn-secondary      /* Secondary button */
.input-field        /* Form input */
.card               /* Card container */
.glass              /* Glass morphism */
.gradient-text      /* Gradient text */
```

### Animations

Custom animations:
```css
.animate-slide-in   /* Slide from left */
.animate-fade-in    /* Fade in */
.animate-scale-in   /* Scale up */
```

## 🔐 Authentication

### Auth Context

```typescript
import { useAuth } from '@/lib/AuthContext';

function Component() {
  const { user, loading, login, logout } = useAuth();

  // Login
  await login(email, password);

  // Logout
  await logout();

  // Check user
  if (user) { /* authenticated */ }
}
```

### Protected Routes

Dashboard layout automatically redirects unauthenticated users to login.

## 🚀 Build & Deploy

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect GitHub repository to Vercel for automatic deployments.

## 📦 Dependencies

### Core
- **next** - React framework
- **react** - UI library
- **typescript** - Type safety

### Styling
- **tailwindcss** - Utility CSS
- **framer-motion** - Animations
- **clsx** - Class names
- **tailwind-merge** - Class merging

### Authentication
- **firebase** - Auth & database

### UI Components
- **lucide-react** - Icons
- **react-hot-toast** - Notifications

## 🎯 Best Practices

- ✅ TypeScript for type safety
- ✅ Server and Client components
- ✅ Responsive design
- ✅ Accessible markup
- ✅ Optimized images
- ✅ Code splitting
- ✅ Clean component structure
- ✅ Reusable utilities

## 🐛 Troubleshooting

### Firebase Auth Errors
- Check `.env.local` credentials
- Verify Email/Password is enabled in Firebase Console
- Clear browser cache

### Build Errors
- Check TypeScript errors: `npm run lint`
- Verify all imports are correct
- Check Next.js version compatibility

### Styling Issues
- Clear `.next` folder: `rm -rf .next`
- Restart dev server
- Check Tailwind config

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Firebase Auth](https://firebase.google.com/docs/auth)
- [Lucide Icons](https://lucide.dev/)

## 🔗 Related

- [Backend API Docs](../backend/README.md)
- [Deployment Guide](../DEPLOYMENT.md)
- [Quick Start](../QUICK_START.md)

---

Built with ❤️ for Omena Agency

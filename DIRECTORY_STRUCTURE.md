# 📂 Complete Directory Structure

## Full Project Tree

```
omena-agency-crm/
│
├── 📄 README.md                                    # Main documentation
├── 📄 QUICK_START.md                               # 10-minute setup guide
├── 📄 DEPLOYMENT.md                                # Production deployment guide
├── 📄 PROJECT_SUMMARY.md                           # Project overview
├── 📄 DIRECTORY_STRUCTURE.md                       # This file
├── 📄 .gitignore                                   # Git ignore rules
├── 📄 Omena_Agency_CRM_API.postman_collection.json # Postman API tests
│
├── 📁 frontend/                                    # Next.js Frontend Application
│   ├── 📁 src/
│   │   ├── 📁 app/                                # Next.js App Router
│   │   │   ├── 📁 dashboard/                      # Dashboard Section
│   │   │   │   ├── 📁 services/
│   │   │   │   │   └── 📄 page.tsx               # Services page (coming soon)
│   │   │   │   ├── 📁 team/
│   │   │   │   │   └── 📄 page.tsx               # Team members page
│   │   │   │   ├── 📁 expenses/
│   │   │   │   │   └── 📄 page.tsx               # Expenses page
│   │   │   │   ├── 📁 transactions/
│   │   │   │   │   └── 📄 page.tsx               # Transactions page
│   │   │   │   ├── 📁 receipts/
│   │   │   │   │   └── 📄 page.tsx               # Receipts page
│   │   │   │   ├── 📁 customers/
│   │   │   │   │   └── 📄 page.tsx               # Customers page
│   │   │   │   ├── 📁 settings/
│   │   │   │   │   └── 📄 page.tsx               # Settings page
│   │   │   │   ├── 📄 layout.tsx                 # Dashboard layout with auth
│   │   │   │   └── 📄 page.tsx                   # Main dashboard page
│   │   │   ├── 📁 login/
│   │   │   │   └── 📄 page.tsx                   # Login page
│   │   │   ├── 📄 layout.tsx                     # Root layout
│   │   │   ├── 📄 page.tsx                       # Home/redirect page
│   │   │   └── 📄 globals.css                    # Global styles & Tailwind
│   │   │
│   │   ├── 📁 components/                         # Reusable Components
│   │   │   ├── 📄 Sidebar.tsx                    # Navigation sidebar
│   │   │   └── 📄 ComingSoon.tsx                 # Coming soon template
│   │   │
│   │   ├── 📁 lib/                                # Core Utilities
│   │   │   ├── 📄 firebase.ts                    # Firebase configuration
│   │   │   └── 📄 AuthContext.tsx                # Authentication context
│   │   │
│   │   ├── 📁 utils/                              # Helper Functions
│   │   │   └── 📄 cn.ts                          # Class name utility
│   │   │
│   │   ├── 📁 hooks/                              # Custom React Hooks
│   │   ├── 📁 styles/                             # Additional Styles
│   │   ├── 📁 assets/                             # Static Assets
│   │   └── 📁 config/                             # Configuration Files
│   │
│   ├── 📁 public/                                 # Public Static Files
│   │
│   ├── 📄 package.json                            # Frontend dependencies
│   ├── 📄 package-lock.json                       # Lock file
│   ├── 📄 next.config.js                          # Next.js configuration
│   ├── 📄 tailwind.config.ts                      # Tailwind CSS config
│   ├── 📄 postcss.config.js                       # PostCSS config
│   ├── 📄 tsconfig.json                           # TypeScript config
│   ├── 📄 tsconfig.node.json                      # TS config for Node
│   ├── 📄 .eslintrc.json                          # ESLint configuration
│   ├── 📄 .env.local.example                      # Environment template
│   ├── 📄 .gitignore                              # Git ignore (frontend)
│   └── 📄 README.md                               # Frontend documentation
│
├── 📁 backend/                                     # Express.js Backend API
│   ├── 📁 models/                                 # Mongoose Database Models
│   │   ├── 📄 Customer.js                        # Customer schema
│   │   ├── 📄 Service.js                         # Service schema
│   │   ├── 📄 Transaction.js                     # Transaction schema
│   │   ├── 📄 Expense.js                         # Expense schema
│   │   ├── 📄 TeamMember.js                      # Team member schema
│   │   └── 📄 Receipt.js                         # Receipt schema
│   │
│   ├── 📁 controllers/                            # Business Logic Controllers
│   │   ├── 📄 customerController.js              # Customer operations
│   │   ├── 📄 serviceController.js               # Service operations
│   │   ├── 📄 transactionController.js           # Transaction operations
│   │   ├── 📄 expenseController.js               # Expense operations
│   │   ├── 📄 teamController.js                  # Team operations
│   │   └── 📄 receiptController.js               # Receipt operations
│   │
│   ├── 📁 routes/                                 # API Route Definitions
│   │   ├── 📄 customerRoutes.js                  # Customer routes
│   │   ├── 📄 serviceRoutes.js                   # Service routes
│   │   ├── 📄 transactionRoutes.js               # Transaction routes
│   │   ├── 📄 expenseRoutes.js                   # Expense routes
│   │   ├── 📄 teamRoutes.js                      # Team routes
│   │   └── 📄 receiptRoutes.js                   # Receipt routes
│   │
│   ├── 📁 config/                                 # Configuration Files
│   │   └── 📄 database.js                        # MongoDB connection
│   │
│   ├── 📁 middleware/                             # Custom Middleware
│   ├── 📁 api/                                    # API Utilities
│   │
│   ├── 📄 server.js                               # Server entry point
│   ├── 📄 package.json                            # Backend dependencies
│   ├── 📄 package-lock.json                       # Lock file
│   ├── 📄 .env.example                            # Environment template
│   ├── 📄 .gitignore                              # Git ignore (backend)
│   └── 📄 README.md                               # Backend documentation
│
└── 📁 node_modules/                               # Dependencies (gitignored)
```

## File Count Summary

| Category | Count | Description |
|----------|-------|-------------|
| **Frontend** | 25+ | React/Next.js components & pages |
| **Backend** | 20+ | API routes, controllers & models |
| **Documentation** | 8 | README, guides & references |
| **Configuration** | 10+ | Config files for tools & build |
| **Total** | **60+** | Excluding node_modules |

## Key Directories Explained

### `/frontend/src/app/`
Next.js 14 App Router structure with:
- File-based routing
- Server & client components
- Nested layouts
- Route groups

### `/frontend/src/components/`
Reusable React components:
- Sidebar navigation
- Coming soon templates
- Future: forms, modals, cards

### `/frontend/src/lib/`
Core utilities and providers:
- Firebase integration
- Authentication context
- API client (future)

### `/backend/models/`
Mongoose schemas defining:
- Data structure
- Validation rules
- Relationships
- Indexes

### `/backend/controllers/`
Business logic for:
- CRUD operations
- Data validation
- Error handling
- Response formatting

### `/backend/routes/`
Express route definitions:
- HTTP methods
- URL patterns
- Middleware chains
- Controller mappings

## File Naming Conventions

### Frontend
- **Pages**: `page.tsx` (Next.js convention)
- **Layouts**: `layout.tsx` (Next.js convention)
- **Components**: `PascalCase.tsx` (e.g., `Sidebar.tsx`)
- **Utilities**: `camelCase.ts` (e.g., `firebase.ts`)

### Backend
- **Models**: `PascalCase.js` (e.g., `Customer.js`)
- **Controllers**: `camelCaseController.js`
- **Routes**: `camelCaseRoutes.js`
- **Config**: `camelCase.js`

## Important Files

### Must Configure
1. `/frontend/.env.local` - Firebase credentials
2. `/backend/.env` - MongoDB & JWT settings

### Entry Points
1. `/frontend/src/app/page.tsx` - Frontend entry
2. `/backend/server.js` - Backend entry

### Documentation
1. `/README.md` - Start here
2. `/QUICK_START.md` - Setup guide
3. `/DEPLOYMENT.md` - Production guide

## Generated Files (Gitignored)

```
frontend/
├── .next/              # Next.js build output
├── node_modules/       # Dependencies
└── .env.local          # Environment variables

backend/
├── node_modules/       # Dependencies
└── .env                # Environment variables
```

## Adding New Features

### New Frontend Page
```
1. Create: /frontend/src/app/dashboard/[feature]/page.tsx
2. Add route to sidebar: /frontend/src/components/Sidebar.tsx
3. Update navigation array
```

### New Backend Resource
```
1. Create model: /backend/models/Resource.js
2. Create controller: /backend/controllers/resourceController.js
3. Create routes: /backend/routes/resourceRoutes.js
4. Register in server.js
```

## Size Estimates

| Directory | Size (approx) |
|-----------|---------------|
| Frontend source | ~500 KB |
| Backend source | ~200 KB |
| Documentation | ~150 KB |
| Configuration | ~50 KB |
| **Total (excluding node_modules)** | **~900 KB** |

With dependencies:
- Frontend: ~400 MB
- Backend: ~100 MB

---

💡 **Tip**: Use `tree -I "node_modules|.next|.git"` command to view structure in terminal

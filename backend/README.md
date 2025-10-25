# Omena Agency CRM - Backend API

RESTful API for the Omena Agency CRM system built with Node.js, Express, and MongoDB.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start development server
npm run dev

# Start production server
npm start
```

## 📁 Project Structure

```
backend/
├── api/              # API utilities
├── config/           # Configuration files
│   └── database.js   # MongoDB connection
├── controllers/      # Business logic
│   ├── customerController.js
│   ├── serviceController.js
│   ├── transactionController.js
│   ├── expenseController.js
│   ├── teamController.js
│   └── receiptController.js
├── models/           # Mongoose schemas
│   ├── Customer.js
│   ├── Service.js
│   ├── Transaction.js
│   ├── Expense.js
│   ├── TeamMember.js
│   └── Receipt.js
├── routes/           # API routes
│   ├── customerRoutes.js
│   ├── serviceRoutes.js
│   ├── transactionRoutes.js
│   ├── expenseRoutes.js
│   ├── teamRoutes.js
│   └── receiptRoutes.js
├── middleware/       # Custom middleware
├── .env.example      # Environment template
├── .gitignore
├── package.json
├── README.md
└── server.js         # Entry point
```

## 🔌 API Endpoints

### Health Check
- `GET /health` - Check API status
- `GET /` - API welcome message

### Customers (`/api/v1/customers`)
- `GET /` - List all customers (with pagination)
- `GET /:id` - Get customer by ID
- `POST /` - Create new customer
- `PUT /:id` - Update customer
- `DELETE /:id` - Delete customer

### Services (`/api/v1/services`)
- `GET /` - List all services
- `GET /:id` - Get service by ID
- `POST /` - Create new service
- `PUT /:id` - Update service
- `DELETE /:id` - Delete service

### Transactions (`/api/v1/transactions`)
- `GET /` - List all transactions
- `GET /:id` - Get transaction by ID
- `POST /` - Create new transaction
- `PUT /:id` - Update transaction
- `DELETE /:id` - Delete transaction

### Expenses (`/api/v1/expenses`)
- `GET /` - List all expenses
- `GET /:id` - Get expense by ID
- `POST /` - Create new expense
- `PUT /:id` - Update expense
- `DELETE /:id` - Delete expense

### Team Members (`/api/v1/team`)
- `GET /` - List all team members
- `GET /:id` - Get team member by ID
- `POST /` - Create new team member
- `PUT /:id` - Update team member
- `DELETE /:id` - Delete team member

### Receipts (`/api/v1/receipts`)
- `GET /` - List all receipts
- `GET /:id` - Get receipt by ID
- `POST /` - Create new receipt
- `PUT /:id` - Update receipt
- `DELETE /:id` - Delete receipt

## 📊 Query Parameters

All list endpoints support:

**Pagination:**
- `?page=1` - Page number (default: 1)
- `?limit=10` - Items per page (default: 10)

**Filtering:**
- `?status=active` - Filter by status
- `?category=design` - Filter by category
- `?department=sales` - Filter by department

**Search:**
- `?search=keyword` - Search across relevant fields

**Example:**
```
GET /api/v1/customers?page=1&limit=20&status=active&search=john
```

## 📝 Request/Response Examples

### Create Customer
```bash
POST /api/v1/customers
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "company": "Tech Corp",
  "status": "active"
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "_id": "65a1234567890abcdef12345",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "company": "Tech Corp",
    "status": "active",
    "totalSpent": 0,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### List with Pagination
```bash
GET /api/v1/customers?page=1&limit=10
```

**Response:**
```json
{
  "status": "success",
  "data": [...],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 47
  }
}
```

## ⚙️ Environment Variables

Create a `.env` file:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/omena-crm

# Security
JWT_SECRET=your_secret_key_here

# CORS
FRONTEND_URL=http://localhost:3000

# API
API_VERSION=v1
```

## 🗄️ Database Models

### Customer
- firstName, lastName, email (required)
- phone, company, address
- status (active/inactive/pending)
- totalSpent, notes, tags

### Service
- name, description, category (required)
- price, currency, duration
- status, features

### Transaction
- customer (ref), service (ref)
- amount, currency, type
- status, paymentMethod
- invoiceNumber, transactionDate

### Expense
- title, amount, category (required)
- vendor, paymentMethod
- receiptUrl, expenseDate
- status, approvedBy (ref)

### Team Member
- firstName, lastName, email (required)
- position, department, role
- salary, hireDate, status
- skills, bio

### Receipt
- receiptNumber, customer (ref)
- items[], subtotal, tax, total
- status, issueDate, dueDate
- pdfUrl

## 🔒 Security Features

- ✅ Helmet (Security headers)
- ✅ CORS protection
- ✅ Input validation
- ✅ MongoDB injection prevention
- ✅ Environment variables
- ✅ Error handling
- ✅ Request logging

## 🧪 Testing

Use the Postman collection:
```bash
# Import this file into Postman:
../Omena_Agency_CRM_API.postman_collection.json
```

## 🐛 Error Responses

**404 Not Found:**
```json
{
  "status": "error",
  "message": "Customer not found"
}
```

**400 Bad Request:**
```json
{
  "status": "error",
  "message": "Validation error message"
}
```

**500 Server Error:**
```json
{
  "status": "error",
  "message": "Internal server error"
}
```

## 📦 Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **cors** - CORS middleware
- **dotenv** - Environment variables
- **helmet** - Security headers
- **morgan** - HTTP logging
- **compression** - Response compression

## 🚀 Deployment

See [DEPLOYMENT.md](../DEPLOYMENT.md) for production deployment instructions.

## 📚 Additional Resources

- [Express Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [MongoDB Manual](https://docs.mongodb.com/)

---

For frontend documentation, see [../frontend/README.md](../frontend/README.md)

# Omena CRM - Quick Reference Card

## 🚀 Start Servers

```bash
# Backend (Terminal 1)
cd backend && npm run dev

# Frontend (Terminal 2)  
cd frontend && npm run dev
```

## 🔑 Authentication

### Signup
```bash
curl -X POST http://localhost:5000/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"user@omena.com","password":"pass123","firstName":"John","lastName":"Doe"}'
```

### Login (USES EMAIL + PASSWORD)
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@omena.com","password":"pass123"}'
```

## 📊 CRUD Operations

### Customers
```bash
# Create
curl -X POST http://localhost:5000/api/v1/customers \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Alice","lastName":"Johnson","email":"alice@example.com","company":"Tech Inc"}'

# Get All
curl -X GET http://localhost:5000/api/v1/customers \
  -H "Authorization: Bearer TOKEN"

# Get One
curl -X GET http://localhost:5000/api/v1/customers/ID \
  -H "Authorization: Bearer TOKEN"

# Update
curl -X PUT http://localhost:5000/api/v1/customers/ID \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber":"+1999888777"}'

# Delete
curl -X DELETE http://localhost:5000/api/v1/customers/ID \
  -H "Authorization: Bearer TOKEN"
```

### Services
```bash
# Create
curl -X POST http://localhost:5000/api/v1/services \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Web Dev","description":"Website development","category":"Development","price":5000}'

# Get All
curl -X GET http://localhost:5000/api/v1/services \
  -H "Authorization: Bearer TOKEN"
```

### Transactions
```bash
# Create
curl -X POST http://localhost:5000/api/v1/transactions \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"customerId":"cust_1","amount":5000,"type":"income","status":"completed","date":"2024-01-15"}'

# Get All
curl -X GET http://localhost:5000/api/v1/transactions \
  -H "Authorization: Bearer TOKEN"
```

### Expenses
```bash
# Create
curl -X POST http://localhost:5000/api/v1/expenses \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"category":"Software","amount":99,"date":"2024-01-15","vendor":"Adobe"}'

# Get All
curl -X GET http://localhost:5000/api/v1/expenses \
  -H "Authorization: Bearer TOKEN"
```

### Receipts
```bash
# Create
curl -X POST http://localhost:5000/api/v1/receipts \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"customerId":"cust_1","amount":5000,"date":"2024-01-15"}'

# Get All
curl -X GET http://localhost:5000/api/v1/receipts \
  -H "Authorization: Bearer TOKEN"
```

### Team Members
```bash
# Create
curl -X POST http://localhost:5000/api/v1/team \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Jane","lastName":"Smith","email":"jane@omena.com","role":"developer","department":"Engineering"}'

# Get All
curl -X GET http://localhost:5000/api/v1/team \
  -H "Authorization: Bearer TOKEN"
```

## 📍 All Endpoints

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/health` | GET | No | Health check |
| `/api/v1/auth/signup` | POST | No | Register user |
| `/api/v1/auth/login` | POST | No | Login (email+password) |
| `/api/v1/auth/profile` | GET | Yes | Get profile |
| `/api/v1/auth/profile` | PUT | Yes | Update profile |
| `/api/v1/auth/logout` | POST | Yes | Logout |
| `/api/v1/customers` | GET | Yes | List customers |
| `/api/v1/customers` | POST | Yes | Create customer |
| `/api/v1/customers/:id` | GET | Yes | Get customer |
| `/api/v1/customers/:id` | PUT | Yes | Update customer |
| `/api/v1/customers/:id` | DELETE | Yes | Delete customer |
| `/api/v1/services` | GET | Yes | List services |
| `/api/v1/services` | POST | Yes | Create service |
| `/api/v1/services/:id` | GET | Yes | Get service |
| `/api/v1/services/:id` | PUT | Yes | Update service |
| `/api/v1/services/:id` | DELETE | Yes | Delete service |
| `/api/v1/transactions` | GET | Yes | List transactions |
| `/api/v1/transactions` | POST | Yes | Create transaction |
| `/api/v1/transactions/:id` | GET | Yes | Get transaction |
| `/api/v1/transactions/:id` | PUT | Yes | Update transaction |
| `/api/v1/transactions/:id` | DELETE | Yes | Delete transaction |
| `/api/v1/expenses` | GET | Yes | List expenses |
| `/api/v1/expenses` | POST | Yes | Create expense |
| `/api/v1/expenses/:id` | GET | Yes | Get expense |
| `/api/v1/expenses/:id` | PUT | Yes | Update expense |
| `/api/v1/expenses/:id` | DELETE | Yes | Delete expense |
| `/api/v1/receipts` | GET | Yes | List receipts |
| `/api/v1/receipts` | POST | Yes | Create receipt |
| `/api/v1/receipts/:id` | GET | Yes | Get receipt |
| `/api/v1/receipts/:id` | PUT | Yes | Update receipt |
| `/api/v1/receipts/:id` | DELETE | Yes | Delete receipt |
| `/api/v1/team` | GET | Yes | List team members |
| `/api/v1/team` | POST | Yes | Create team member |
| `/api/v1/team/:id` | GET | Yes | Get team member |
| `/api/v1/team/:id` | PUT | Yes | Update team member |
| `/api/v1/team/:id` | DELETE | Yes | Delete team member |

**Total: 40 Endpoints**

## 🔧 Environment Setup

### Backend `.env`
```
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Frontend `.env.local`
```
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000/api/v1
```

## 🐛 Troubleshooting

**401 Unauthorized:** Use ID token from Firebase, not custom token  
**404 Not Found:** Check URL includes `/api/v1/`  
**Backend won't start:** Check Firebase credentials  
**CORS error:** Verify FRONTEND_URL in backend .env

## 📚 Documentation Files

- `FINAL_SUMMARY.md` - Complete implementation status
- `IMPLEMENTATION_GUIDE.md` - Code templates
- `QUICK_REFERENCE.md` - This file
- `Omena_Agency_CRM_API.postman_collection.json` - Postman collection

---
**Last Updated:** 2024

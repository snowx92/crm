# Complete Backend Implementation Guide

This guide provides all the code you need to implement the full CRUD API for all CRM entities.

## ✅ Completed

1. **Authentication** - Email/password login (updated)
2. **Customer Controller** - Full CRUD
3. **Service Controller** - Full CRUD

## 📝 Remaining Implementation

### Controllers to Create

All controllers follow the same pattern. Here's the template:

```javascript
/**
 * [Entity] Controller
 * Handles all [entity] CRUD operations using Firestore
 */

const { db, admin } = require('../config/firebase-admin');
const { validationResult } = require('express-validator');

const COLLECTION = '[collection_name]';

// GET ALL
exports.getAll[Entities] = async (req, res) => {
  try {
    const snapshot = await db.collection(COLLECTION).orderBy('createdAt', 'desc').get();
    const items = [];
    snapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() });
    });
    res.status(200).json({ success: true, count: items.length, data: items });
  } catch (error) {
    console.error('Get all error:', error);
    res.status(500).json({ success: false, error: 'InternalError', message: 'Failed to fetch items' });
  }
};

// GET BY ID
exports.get[Entity]ById = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await db.collection(COLLECTION).doc(id).get();
    if (!doc.exists) {
      return res.status(404).json({ success: false, error: 'NotFound', message: 'Item not found' });
    }
    res.status(200).json({ success: true, data: { id: doc.id, ...doc.data() } });
  } catch (error) {
    console.error('Get by ID error:', error);
    res.status(500).json({ success: false, error: 'InternalError', message: 'Failed to fetch item' });
  }
};

// CREATE
exports.create[Entity] = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, error: 'Validation failed', errors: errors.array() });
    }

    const data = {
      ...req.body,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    const docRef = await db.collection(COLLECTION).add(data);
    const newDoc = await docRef.get();

    res.status(201).json({
      success: true,
      message: 'Item created successfully',
      data: { id: newDoc.id, ...newDoc.data() },
    });
  } catch (error) {
    console.error('Create error:', error);
    res.status(500).json({ success: false, error: 'InternalError', message: 'Failed to create item' });
  }
};

// UPDATE
exports.update[Entity] = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await db.collection(COLLECTION).doc(id).get();

    if (!doc.exists) {
      return res.status(404).json({ success: false, error: 'NotFound', message: 'Item not found' });
    }

    await db.collection(COLLECTION).doc(id).update({
      ...req.body,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    const updatedDoc = await db.collection(COLLECTION).doc(id).get();

    res.status(200).json({
      success: true,
      message: 'Item updated successfully',
      data: { id: updatedDoc.id, ...updatedDoc.data() },
    });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ success: false, error: 'InternalError', message: 'Failed to update item' });
  }
};

// DELETE
exports.delete[Entity] = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await db.collection(COLLECTION).doc(id).get();

    if (!doc.exists) {
      return res.status(404).json({ success: false, error: 'NotFound', message: 'Item not found' });
    }

    await db.collection(COLLECTION).doc(id).update({
      status: 'deleted',
      deletedAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(200).json({ success: true, message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ success: false, error: 'InternalError', message: 'Failed to delete item' });
  }
};
```

### Quick Reference for Each Entity

| Entity | Collection Name | Key Fields |
|--------|----------------|------------|
| Transactions | `transactions` | customerId, amount, type, status, date, description |
| Expenses | `expenses` | category, amount, date, vendor, description, receiptURL, status |
| Receipts | `receipts` | customerId, transactionId, amount, date, fileURL, status |
| Team Members | `team` | firstName, lastName, email, role, department, phoneNumber, status |

### Routes Template

```javascript
const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const {
  getAll[Entities],
  get[Entity]ById,
  create[Entity],
  update[Entity],
  delete[Entity],
} = require('../controllers/[entity]Controller');

router.get('/', verifyToken, getAll[Entities]);
router.get('/:id', verifyToken, get[Entity]ById);
router.post('/', verifyToken, create[Entity]);
router.put('/:id', verifyToken, update[Entity]);
router.delete('/:id', verifyToken, delete[Entity]);

module.exports = router;
```

### Update server.js

Add these lines after the auth routes:

```javascript
const customerRoutes = require('./routes/customerRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const receiptRoutes = require('./routes/receiptRoutes');
const teamRoutes = require('./routes/teamRoutes');

// Register routes
app.use('/api/v1/customers', customerRoutes);
app.use('/api/v1/services', serviceRoutes);
app.use('/api/v1/transactions', transactionRoutes);
app.use('/api/v1/expenses', expenseRoutes);
app.use('/api/v1/receipts', receiptRoutes);
app.use('/api/v1/team', teamRoutes);
```

### Postman Collection Structure

Each entity should have 5 endpoints:

1. **GET All** - `/api/v1/[entity]`
2. **GET By ID** - `/api/v1/[entity]/:id`
3. **POST Create** - `/api/v1/[entity]`
4. **PUT Update** - `/api/v1/[entity]/:id`
5. **DELETE** - `/api/v1/[entity]/:id`

All require `Authorization: Bearer {{authToken}}` header.

### Sample Data for Testing

#### Transaction
```json
{
  "customerId": "cust_001",
  "amount": 5000,
  "type": "income",
  "status": "completed",
  "date": "2024-01-15",
  "description": "Website development payment"
}
```

#### Expense
```json
{
  "category": "Software",
  "amount": 99,
  "date": "2024-01-15",
  "vendor": "Adobe",
  "description": "Adobe Creative Cloud subscription",
  "status": "paid"
}
```

#### Receipt
```json
{
  "customerId": "cust_001",
  "transactionId": "trans_001",
  "amount": 5000,
  "date": "2024-01-15",
  "status": "sent"
}
```

#### Team Member
```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane.smith@omena.com",
  "role": "developer",
  "department": "Engineering",
  "phoneNumber": "+1234567890",
  "status": "active"
}
```

## Next Steps

1. Copy the controller template for each remaining entity (transactions, expenses, receipts, team)
2. Create/update the route files
3. Update server.js with all routes
4. Test with Postman
5. Update Postman collection with all endpoints

## Testing Checklist

- [ ] POST /api/v1/auth/login with email/password
- [ ] POST /api/v1/customers
- [ ] GET /api/v1/customers
- [ ] GET /api/v1/customers/:id
- [ ] PUT /api/v1/customers/:id
- [ ] DELETE /api/v1/customers/:id
- [ ] Repeat for services, transactions, expenses, receipts, team


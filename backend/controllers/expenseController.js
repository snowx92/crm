/**
 * Expense Controller
 * Handles all expense CRUD operations using Firestore
 */

const { db, admin } = require('../config/firebase-admin');
const { validationResult } = require('express-validator');

const COLLECTION = 'expenses';

exports.getAllExpenses = async (req, res) => {
  try {
    const snapshot = await db.collection(COLLECTION).orderBy('createdAt', 'desc').get();
    const expenses = [];
    snapshot.forEach((doc) => {
      expenses.push({ id: doc.id, ...doc.data() });
    });
    res.status(200).json({ success: true, count: expenses.length, data: expenses });
  } catch (error) {
    console.error('Get expenses error:', error);
    res.status(500).json({ success: false, error: 'InternalError', message: 'Failed to fetch expenses' });
  }
};

exports.getExpenseById = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await db.collection(COLLECTION).doc(id).get();
    if (!doc.exists) {
      return res.status(404).json({ success: false, error: 'NotFound', message: 'Expense not found' });
    }
    res.status(200).json({ success: true, data: { id: doc.id, ...doc.data() } });
  } catch (error) {
    console.error('Get expense error:', error);
    res.status(500).json({ success: false, error: 'InternalError', message: 'Failed to fetch expense' });
  }
};

exports.createExpense = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, error: 'Validation failed', errors: errors.array() });
    }

    const data = {
      ...req.body,
      status: req.body.status || 'pending',
      receiptURL: req.body.receiptURL || null,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    const docRef = await db.collection(COLLECTION).add(data);
    const newDoc = await docRef.get();

    res.status(201).json({
      success: true,
      message: 'Expense created successfully',
      data: { id: newDoc.id, ...newDoc.data() },
    });
  } catch (error) {
    console.error('Create expense error:', error);
    res.status(500).json({ success: false, error: 'InternalError', message: 'Failed to create expense' });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await db.collection(COLLECTION).doc(id).get();

    if (!doc.exists) {
      return res.status(404).json({ success: false, error: 'NotFound', message: 'Expense not found' });
    }

    await db.collection(COLLECTION).doc(id).update({
      ...req.body,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    const updatedDoc = await db.collection(COLLECTION).doc(id).get();

    res.status(200).json({
      success: true,
      message: 'Expense updated successfully',
      data: { id: updatedDoc.id, ...updatedDoc.data() },
    });
  } catch (error) {
    console.error('Update expense error:', error);
    res.status(500).json({ success: false, error: 'InternalError', message: 'Failed to update expense' });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await db.collection(COLLECTION).doc(id).get();

    if (!doc.exists) {
      return res.status(404).json({ success: false, error: 'NotFound', message: 'Expense not found' });
    }

    await db.collection(COLLECTION).doc(id).update({
      status: 'deleted',
      deletedAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(200).json({ success: true, message: 'Expense deleted successfully' });
  } catch (error) {
    console.error('Delete expense error:', error);
    res.status(500).json({ success: false, error: 'InternalError', message: 'Failed to delete expense' });
  }
};

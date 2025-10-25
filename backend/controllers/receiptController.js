/**
 * Receipt Controller
 * Handles all receipt CRUD operations using Firestore
 */

const { db, admin } = require('../config/firebase-admin');
const { validationResult } = require('express-validator');

const COLLECTION = 'receipts';

exports.getAllReceipts = async (req, res) => {
  try {
    const snapshot = await db.collection(COLLECTION).orderBy('createdAt', 'desc').get();
    const receipts = [];
    snapshot.forEach((doc) => {
      receipts.push({ id: doc.id, ...doc.data() });
    });
    res.status(200).json({ success: true, count: receipts.length, data: receipts });
  } catch (error) {
    console.error('Get receipts error:', error);
    res.status(500).json({ success: false, error: 'InternalError', message: 'Failed to fetch receipts' });
  }
};

exports.getReceiptById = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await db.collection(COLLECTION).doc(id).get();
    if (!doc.exists) {
      return res.status(404).json({ success: false, error: 'NotFound', message: 'Receipt not found' });
    }
    res.status(200).json({ success: true, data: { id: doc.id, ...doc.data() } });
  } catch (error) {
    console.error('Get receipt error:', error);
    res.status(500).json({ success: false, error: 'InternalError', message: 'Failed to fetch receipt' });
  }
};

exports.createReceipt = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, error: 'Validation failed', errors: errors.array() });
    }

    const data = {
      ...req.body,
      status: req.body.status || 'draft',
      fileURL: req.body.fileURL || null,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    const docRef = await db.collection(COLLECTION).add(data);
    const newDoc = await docRef.get();

    res.status(201).json({
      success: true,
      message: 'Receipt created successfully',
      data: { id: newDoc.id, ...newDoc.data() },
    });
  } catch (error) {
    console.error('Create receipt error:', error);
    res.status(500).json({ success: false, error: 'InternalError', message: 'Failed to create receipt' });
  }
};

exports.updateReceipt = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await db.collection(COLLECTION).doc(id).get();

    if (!doc.exists) {
      return res.status(404).json({ success: false, error: 'NotFound', message: 'Receipt not found' });
    }

    await db.collection(COLLECTION).doc(id).update({
      ...req.body,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    const updatedDoc = await db.collection(COLLECTION).doc(id).get();

    res.status(200).json({
      success: true,
      message: 'Receipt updated successfully',
      data: { id: updatedDoc.id, ...updatedDoc.data() },
    });
  } catch (error) {
    console.error('Update receipt error:', error);
    res.status(500).json({ success: false, error: 'InternalError', message: 'Failed to update receipt' });
  }
};

exports.deleteReceipt = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await db.collection(COLLECTION).doc(id).get();

    if (!doc.exists) {
      return res.status(404).json({ success: false, error: 'NotFound', message: 'Receipt not found' });
    }

    await db.collection(COLLECTION).doc(id).update({
      status: 'deleted',
      deletedAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(200).json({ success: true, message: 'Receipt deleted successfully' });
  } catch (error) {
    console.error('Delete receipt error:', error);
    res.status(500).json({ success: false, error: 'InternalError', message: 'Failed to delete receipt' });
  }
};

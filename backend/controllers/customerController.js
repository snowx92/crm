/**
 * Customer Controller
 *
 * Handles all customer CRUD operations using Firestore
 */

const { db, admin } = require('../config/firebase-admin');
const { validationResult } = require('express-validator');

const COLLECTION = 'customers';

/**
 * @desc    Get all customers
 * @route   GET /api/v1/customers
 * @access  Private
 */
exports.getAllCustomers = async (req, res) => {
  try {
    const snapshot = await db.collection(COLLECTION).orderBy('createdAt', 'desc').get();

    const customers = [];
    snapshot.forEach((doc) => {
      customers.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    res.status(200).json({
      success: true,
      count: customers.length,
      data: customers,
    });
  } catch (error) {
    console.error('Get customers error:', error);
    res.status(500).json({
      success: false,
      error: 'InternalError',
      message: 'Failed to fetch customers',
    });
  }
};

/**
 * @desc    Get single customer
 * @route   GET /api/v1/customers/:id
 * @access  Private
 */
exports.getCustomerById = async (req, res) => {
  try {
    const { id } = req.params;

    const doc = await db.collection(COLLECTION).doc(id).get();

    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        error: 'NotFound',
        message: 'Customer not found',
      });
    }

    res.status(200).json({
      success: true,
      data: {
        id: doc.id,
        ...doc.data(),
      },
    });
  } catch (error) {
    console.error('Get customer error:', error);
    res.status(500).json({
      success: false,
      error: 'InternalError',
      message: 'Failed to fetch customer',
    });
  }
};

/**
 * @desc    Create customer
 * @route   POST /api/v1/customers
 * @access  Private
 */
exports.createCustomer = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        errors: errors.array(),
      });
    }

    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      company,
      address,
      status,
      notes,
    } = req.body;

    const customerData = {
      firstName,
      lastName,
      email,
      phoneNumber: phoneNumber || null,
      company: company || null,
      address: address || null,
      status: status || 'active',
      totalSpent: 0,
      projectsCompleted: 0,
      notes: notes || '',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    const docRef = await db.collection(COLLECTION).add(customerData);

    const newDoc = await docRef.get();

    res.status(201).json({
      success: true,
      message: 'Customer created successfully',
      data: {
        id: newDoc.id,
        ...newDoc.data(),
      },
    });
  } catch (error) {
    console.error('Create customer error:', error);
    res.status(500).json({
      success: false,
      error: 'InternalError',
      message: 'Failed to create customer',
    });
  }
};

/**
 * @desc    Update customer
 * @route   PUT /api/v1/customers/:id
 * @access  Private
 */
exports.updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Check if customer exists
    const doc = await db.collection(COLLECTION).doc(id).get();

    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        error: 'NotFound',
        message: 'Customer not found',
      });
    }

    // Update customer
    await db.collection(COLLECTION).doc(id).update({
      ...updates,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // Get updated customer
    const updatedDoc = await db.collection(COLLECTION).doc(id).get();

    res.status(200).json({
      success: true,
      message: 'Customer updated successfully',
      data: {
        id: updatedDoc.id,
        ...updatedDoc.data(),
      },
    });
  } catch (error) {
    console.error('Update customer error:', error);
    res.status(500).json({
      success: false,
      error: 'InternalError',
      message: 'Failed to update customer',
    });
  }
};

/**
 * @desc    Delete customer
 * @route   DELETE /api/v1/customers/:id
 * @access  Private
 */
exports.deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if customer exists
    const doc = await db.collection(COLLECTION).doc(id).get();

    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        error: 'NotFound',
        message: 'Customer not found',
      });
    }

    // Soft delete - update status to 'deleted'
    await db.collection(COLLECTION).doc(id).update({
      status: 'deleted',
      deletedAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(200).json({
      success: true,
      message: 'Customer deleted successfully',
    });
  } catch (error) {
    console.error('Delete customer error:', error);
    res.status(500).json({
      success: false,
      error: 'InternalError',
      message: 'Failed to delete customer',
    });
  }
};

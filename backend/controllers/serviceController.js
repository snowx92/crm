/**
 * Service Controller
 *
 * Handles all service CRUD operations using Firestore
 */

const { db, admin } = require('../config/firebase-admin');
const { validationResult } = require('express-validator');

const COLLECTION = 'services';

/**
 * @desc    Get all services
 * @route   GET /api/v1/services
 * @access  Private
 */
exports.getAllServices = async (req, res) => {
  try {
    const snapshot = await db.collection(COLLECTION).orderBy('createdAt', 'desc').get();

    const services = [];
    snapshot.forEach((doc) => {
      services.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    res.status(200).json({
      success: true,
      count: services.length,
      data: services,
    });
  } catch (error) {
    console.error('Get services error:', error);
    res.status(500).json({
      success: false,
      error: 'InternalError',
      message: 'Failed to fetch services',
    });
  }
};

/**
 * @desc    Get single service
 * @route   GET /api/v1/services/:id
 * @access  Private
 */
exports.getServiceById = async (req, res) => {
  try {
    const { id } = req.params;

    const doc = await db.collection(COLLECTION).doc(id).get();

    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        error: 'NotFound',
        message: 'Service not found',
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
    console.error('Get service error:', error);
    res.status(500).json({
      success: false,
      error: 'InternalError',
      message: 'Failed to fetch service',
    });
  }
};

/**
 * @desc    Create service
 * @route   POST /api/v1/services
 * @access  Private
 */
exports.createService = async (req, res) => {
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
      name,
      description,
      category,
      price,
      duration,
      status,
      features,
    } = req.body;

    const serviceData = {
      name,
      description,
      category,
      price,
      duration: duration || null,
      status: status || 'active',
      features: features || [],
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    const docRef = await db.collection(COLLECTION).add(serviceData);

    const newDoc = await docRef.get();

    res.status(201).json({
      success: true,
      message: 'Service created successfully',
      data: {
        id: newDoc.id,
        ...newDoc.data(),
      },
    });
  } catch (error) {
    console.error('Create service error:', error);
    res.status(500).json({
      success: false,
      error: 'InternalError',
      message: 'Failed to create service',
    });
  }
};

/**
 * @desc    Update service
 * @route   PUT /api/v1/services/:id
 * @access  Private
 */
exports.updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Check if service exists
    const doc = await db.collection(COLLECTION).doc(id).get();

    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        error: 'NotFound',
        message: 'Service not found',
      });
    }

    // Update service
    await db.collection(COLLECTION).doc(id).update({
      ...updates,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // Get updated service
    const updatedDoc = await db.collection(COLLECTION).doc(id).get();

    res.status(200).json({
      success: true,
      message: 'Service updated successfully',
      data: {
        id: updatedDoc.id,
        ...updatedDoc.data(),
      },
    });
  } catch (error) {
    console.error('Update service error:', error);
    res.status(500).json({
      success: false,
      error: 'InternalError',
      message: 'Failed to update service',
    });
  }
};

/**
 * @desc    Delete service
 * @route   DELETE /api/v1/services/:id
 * @access  Private
 */
exports.deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if service exists
    const doc = await db.collection(COLLECTION).doc(id).get();

    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        error: 'NotFound',
        message: 'Service not found',
      });
    }

    // Delete service
    await db.collection(COLLECTION).doc(id).delete();

    res.status(200).json({
      success: true,
      message: 'Service deleted successfully',
    });
  } catch (error) {
    console.error('Delete service error:', error);
    res.status(500).json({
      success: false,
      error: 'InternalError',
      message: 'Failed to delete service',
    });
  }
};

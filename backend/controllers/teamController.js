/**
 * Team Controller
 * Handles all team member CRUD operations using Firestore
 */

const { db, admin } = require('../config/firebase-admin');
const { validationResult } = require('express-validator');

const COLLECTION = 'team';

exports.getAllTeamMembers = async (req, res) => {
  try {
    const snapshot = await db.collection(COLLECTION).orderBy('createdAt', 'desc').get();
    const team = [];
    snapshot.forEach((doc) => {
      team.push({ id: doc.id, ...doc.data() });
    });
    res.status(200).json({ success: true, count: team.length, data: team });
  } catch (error) {
    console.error('Get team members error:', error);
    res.status(500).json({ success: false, error: 'InternalError', message: 'Failed to fetch team members' });
  }
};

exports.getTeamMemberById = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await db.collection(COLLECTION).doc(id).get();
    if (!doc.exists) {
      return res.status(404).json({ success: false, error: 'NotFound', message: 'Team member not found' });
    }
    res.status(200).json({ success: true, data: { id: doc.id, ...doc.data() } });
  } catch (error) {
    console.error('Get team member error:', error);
    res.status(500).json({ success: false, error: 'InternalError', message: 'Failed to fetch team member' });
  }
};

exports.createTeamMember = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, error: 'Validation failed', errors: errors.array() });
    }

    const data = {
      ...req.body,
      status: req.body.status || 'active',
      photoURL: req.body.photoURL || null,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    const docRef = await db.collection(COLLECTION).add(data);
    const newDoc = await docRef.get();

    res.status(201).json({
      success: true,
      message: 'Team member created successfully',
      data: { id: newDoc.id, ...newDoc.data() },
    });
  } catch (error) {
    console.error('Create team member error:', error);
    res.status(500).json({ success: false, error: 'InternalError', message: 'Failed to create team member' });
  }
};

exports.updateTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await db.collection(COLLECTION).doc(id).get();

    if (!doc.exists) {
      return res.status(404).json({ success: false, error: 'NotFound', message: 'Team member not found' });
    }

    await db.collection(COLLECTION).doc(id).update({
      ...req.body,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    const updatedDoc = await db.collection(COLLECTION).doc(id).get();

    res.status(200).json({
      success: true,
      message: 'Team member updated successfully',
      data: { id: updatedDoc.id, ...updatedDoc.data() },
    });
  } catch (error) {
    console.error('Update team member error:', error);
    res.status(500).json({ success: false, error: 'InternalError', message: 'Failed to update team member' });
  }
};

exports.deleteTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await db.collection(COLLECTION).doc(id).get();

    if (!doc.exists) {
      return res.status(404).json({ success: false, error: 'NotFound', message: 'Team member not found' });
    }

    await db.collection(COLLECTION).doc(id).update({
      status: 'deleted',
      deletedAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(200).json({ success: true, message: 'Team member deleted successfully' });
  } catch (error) {
    console.error('Delete team member error:', error);
    res.status(500).json({ success: false, error: 'InternalError', message: 'Failed to delete team member' });
  }
};

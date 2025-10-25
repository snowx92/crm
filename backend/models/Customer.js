/**
 * Customer Model
 *
 * Defines the schema for customer data
 */

const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    phone: {
      type: String,
      trim: true,
    },
    company: {
      type: String,
      trim: true,
    },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'pending'],
      default: 'active',
    },
    totalSpent: {
      type: Number,
      default: 0,
    },
    notes: {
      type: String,
    },
    tags: [String],
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
customerSchema.index({ email: 1 });
customerSchema.index({ company: 1 });

module.exports = mongoose.model('Customer', customerSchema);

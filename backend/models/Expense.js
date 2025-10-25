/**
 * Expense Model
 *
 * Defines the schema for business expenses
 */

const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Expense title is required'],
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, 'Expense amount is required'],
      min: 0,
    },
    currency: {
      type: String,
      default: 'USD',
    },
    category: {
      type: String,
      required: [true, 'Expense category is required'],
      enum: ['office', 'software', 'marketing', 'travel', 'utilities', 'salaries', 'other'],
    },
    description: {
      type: String,
    },
    vendor: {
      type: String,
      trim: true,
    },
    paymentMethod: {
      type: String,
      enum: ['cash', 'card', 'bank_transfer', 'other'],
    },
    receiptUrl: {
      type: String,
    },
    expenseDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TeamMember',
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
expenseSchema.index({ category: 1, expenseDate: -1 });
expenseSchema.index({ status: 1 });

module.exports = mongoose.model('Expense', expenseSchema);

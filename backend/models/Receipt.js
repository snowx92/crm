/**
 * Receipt Model
 *
 * Defines the schema for receipts and invoices
 */

const mongoose = require('mongoose');

const receiptSchema = new mongoose.Schema(
  {
    receiptNumber: {
      type: String,
      required: true,
      unique: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
    transaction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Transaction',
    },
    items: [
      {
        description: String,
        quantity: {
          type: Number,
          min: 1,
          default: 1,
        },
        unitPrice: {
          type: Number,
          min: 0,
        },
        total: {
          type: Number,
          min: 0,
        },
      },
    ],
    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },
    tax: {
      type: Number,
      default: 0,
      min: 0,
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      default: 'USD',
    },
    status: {
      type: String,
      enum: ['draft', 'sent', 'paid', 'cancelled'],
      default: 'draft',
    },
    issueDate: {
      type: Date,
      default: Date.now,
    },
    dueDate: {
      type: Date,
    },
    paidDate: {
      type: Date,
    },
    notes: {
      type: String,
    },
    pdfUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
receiptSchema.index({ receiptNumber: 1 });
receiptSchema.index({ customer: 1, issueDate: -1 });
receiptSchema.index({ status: 1 });

module.exports = mongoose.model('Receipt', receiptSchema);

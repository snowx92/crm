/**
 * Service Model
 *
 * Defines the schema for services offered by the agency
 */

const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Service name is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Service description is required'],
    },
    category: {
      type: String,
      required: [true, 'Service category is required'],
      enum: ['design', 'development', 'marketing', 'consulting', 'other'],
    },
    price: {
      type: Number,
      required: [true, 'Service price is required'],
      min: 0,
    },
    currency: {
      type: String,
      default: 'USD',
    },
    duration: {
      value: Number,
      unit: {
        type: String,
        enum: ['hours', 'days', 'weeks', 'months'],
      },
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'archived'],
      default: 'active',
    },
    features: [String],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Service', serviceSchema);

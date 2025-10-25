/**
 * Team Member Model
 *
 * Defines the schema for team members/employees
 */

const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema(
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
    position: {
      type: String,
      required: [true, 'Position is required'],
      trim: true,
    },
    department: {
      type: String,
      enum: ['design', 'development', 'marketing', 'sales', 'management', 'other'],
    },
    role: {
      type: String,
      enum: ['admin', 'manager', 'employee'],
      default: 'employee',
    },
    salary: {
      type: Number,
      min: 0,
    },
    hireDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'on_leave'],
      default: 'active',
    },
    avatar: {
      type: String,
    },
    skills: [String],
    bio: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
teamMemberSchema.index({ email: 1 });
teamMemberSchema.index({ department: 1, status: 1 });

module.exports = mongoose.model('TeamMember', teamMemberSchema);

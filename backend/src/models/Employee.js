const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide employee name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
    },
    department: {
      type: String,
      required: [true, 'Please provide department'],
      enum: ['Development', 'HR', 'Sales', 'Marketing', 'Operations', 'Finance'],
    },
    skills: [
      {
        type: String,
        trim: true,
      },
    ],
    performanceScore: {
      type: Number,
      required: [true, 'Please provide performance score'],
      min: 0,
      max: 100,
    },
    experience: {
      type: Number,
      required: [true, 'Please provide years of experience'],
      min: 0,
    },
    aiRecommendations: {
      promotionSuggestion: String,
      trainingSuggestions: [String],
      skillGaps: [String],
      ranking: Number,
      feedback: String,
      generatedAt: Date,
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'on-leave'],
      default: 'active',
    },
  },
  {
    timestamps: true,
  }
);

// Index for searching
employeeSchema.index({ department: 1, performanceScore: -1 });
employeeSchema.index({ email: 1 });

module.exports = mongoose.model('Employee', employeeSchema);

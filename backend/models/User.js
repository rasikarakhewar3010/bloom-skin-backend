const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: String,
  googleId: String,

  // --- Skin Profile ---
  skinProfile: {
    skinType: {
      type: String,
      enum: ['oily', 'dry', 'combination', 'normal', 'sensitive', ''],
      default: '',
    },
    age: { type: Number, min: 10, max: 120 },
    knownAllergies: [{ type: String, trim: true }],
    currentConcerns: [{ type: String, trim: true }],
    environment: {
      type: String,
      enum: ['humid', 'dry', 'polluted', 'temperate', ''],
      default: '',
    },
  },

  // --- App Preferences ---
  preferences: {
    notificationsEnabled: { type: Boolean, default: true },
  },

  // --- Routine Tracking ---
  routineTracking: {
    lastAmCompletion: { type: Date, default: null },
    lastPmCompletion: { type: Date, default: null },
    streak: { type: Number, default: 0 },
  },

  // --- Password Reset ---
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);

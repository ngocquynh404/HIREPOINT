const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  full_name: { type: String },
  address: { type: String },
  education: { type: String },
  experience: { type: [String] },
  skills: { type: [String] },
  industry: { type: String },
  cv_file: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Profile', profileSchema);

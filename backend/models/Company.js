// server/models/Company.js
const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  company_name: { type: String, required: true },
  description: { type: String },
  industry: { type: String },
  location: { type: String },
  specific_address: { type: String },
  website: { type: String },
  logo: { type: String },
  quymo: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
}); 

module.exports = mongoose.model('Company', companySchema);

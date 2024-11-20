const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  gender: { type: String },
  email: { type: String, required: true }, 
  phone: { type: String },
  nationality: { type: String },
  date_of_birth: { type: Date },
  location: { type: String },
  specific_address: { type: String },
  job_title: { type: String },
  job_level: { type: String },
  current_industry: { type: String },
  current_field: { type: String },
  years_of_experience: { type: Number },
  current_salary: { type: Number },
  desired_work_location: { type: String },
  desired_salary: { type: Number },
  education: { type: String },
  experience: [{ type: String }],
  skills: [{ type: String }],
  cv_files: [{ type: String }]
});

const Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;

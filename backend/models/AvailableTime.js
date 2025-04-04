const mongoose = require('mongoose');

const availableTimeSchema = new mongoose.Schema({
  job_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
  interviewer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  start_time: { type: Date, required: true },
  end_time: { type: Date, required: true },
  status: { type: String, enum: ['available', 'booked'], default: 'available' },
});

module.exports = mongoose.model('AvailableTime', availableTimeSchema);

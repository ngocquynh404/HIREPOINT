const mongoose = require('mongoose');

const testAttemptSchema = new mongoose.Schema({
  test_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Test', required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, default: 0 },  // Điểm số, mặc định là 0
  start_time: { type: Date, required: true },
  end_time: { type: Date },
  status: { 
    type: String, 
    enum: ['Đang làm', 'Hoàn thành', 'Không hoàn thành'], 
    default: 'Đang làm' 
  },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TestAttempt', testAttemptSchema);

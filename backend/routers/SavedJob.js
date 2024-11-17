const express = require('express');
const router = express.Router();
const SavedJob = require('../models/SavedJob');
const authenticateToken = require('../middleware/authenticateToken');

// CREATE - Lưu công việc mới savedjobs/save-job
router.post('/save-job', authenticateToken, async (req, res) => {
  const { job_id } = req.body;
  const user_id = req.userId; // Extracted from the JWT token

  try {
    // Check if the job has already been saved by this user
    const existingSavedJob = await SavedJob.findOne({ user_id, job_id });
    if (existingSavedJob) {
      return res.status(400).json({ message: 'Job already saved' });
    }

    // Save the job to the SavedJob collection
    const savedJob = new SavedJob({
      user_id,
      job_id,
    });

    await savedJob.save();
    res.status(201).json({ message: 'Job saved successfully', savedJob });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});
router.get('/user/me', authenticateToken, async (req, res) => {
  const userId = req.userId; // userId đã được xác thực từ JWT token

  try {
    // Tìm tất cả công việc đã lưu của người dùng trong SavedJob collection
    const savedJobs = await SavedJob.find({ user_id: userId }).populate('job_id');
    
    if (savedJobs.length === 0) {
      return res.status(404).json({ message: 'Không có công việc đã lưu.' });
    }

    // Trả về danh sách công việc đã lưu
    res.json(savedJobs);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error });
  }
});

// READ ALL - Lấy tất cả công việc đã lưu của người dùng
router.get('/user/:user_id', async (req, res) => {
  try {
    const savedJobs = await SavedJob.find({ user_id: req.params.user_id }).populate('job_id');
    res.json(savedJobs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// DELETE - Xóa công việc đã lưu
router.delete('/:id', authenticateToken, async (req, res) => {
  const savedJobId = req.params.id;  // Lấy ID công việc đã lưu từ URL

  try {
    // Tìm và xóa công việc đã lưu theo ID
    const deletedSavedJob = await SavedJob.findByIdAndDelete(savedJobId);

    if (!deletedSavedJob) {
      return res.status(404).json({ message: 'Công việc đã lưu không tìm thấy' });
    }

    // Trả về thông báo xóa thành công
    res.json({ message: 'Công việc đã được xóa thành công!' });
  } catch (error) {
    console.error('Error deleting saved job:', error);  // Log lỗi cho debug
    res.status(500).json({ message: 'Lỗi server khi xóa công việc', error });
  }
});


module.exports = router;

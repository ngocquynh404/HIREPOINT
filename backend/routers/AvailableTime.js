const AvailableTime = require('../models/AvailableTime');
const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');


// Tạo khoảng thời gian có sẵn
router.post('/', authenticateToken, async (req, res) => {
    const { job_id, start_time, end_time } = req.body;
    const interviewer_id = req.userId;  // Lấy ID người tuyển dụng từ token
  
    if (!job_id || !start_time || !end_time) {
      return res.status(400).json({ message: 'Thiếu thông tin cần thiết' });
    }
  
    try {
      const availableTime = new AvailableTime({
        job_id,
        interviewer_id,
        start_time,
        end_time,
      });
      await availableTime.save();
      res.status(201).json({ message: 'Khoảng thời gian đã được tạo thành công', availableTime });
    } catch (error) {
      res.status(500).json({ message: 'Lỗi khi tạo khoảng thời gian', error });
    }
  });
  router.put('/confirm/:id', authenticateToken, async (req, res) => {
    const { id } = req.params; // ID của khoảng thời gian khả dụng
    try {
      // Lấy khoảng thời gian khả dụng
      const availableTime = await AvailableTime.findById(id);
      if (!availableTime) {
        return res.status(404).json({ message: 'Không tìm thấy khoảng thời gian khả dụng.' });
      }
  
      // Kiểm tra trạng thái, chỉ cho phép nếu trạng thái là "available"
      if (availableTime.status !== 'available') {
        return res.status(400).json({ message: 'Khoảng thời gian này đã được chọn hoặc không khả dụng.' });
      }
  
      // Cập nhật trạng thái của AvailableTime thành "booked"
      availableTime.status = 'booked';
      await availableTime.save();
  
      // Tạo hoặc cập nhật buổi phỏng vấn
      const interview = await Interview.findOneAndUpdate(
        { job_id: availableTime.job_id, candidate_id: req.userId },
        {
          job_id: availableTime.job_id,
          candidate_id: req.userId,
          interviewer_id: availableTime.interviewer_id,
          interview_date: availableTime.start_time,
          location: 'Online',
          status: 'confirmed',
        },
        { new: true, upsert: true } // Tạo mới nếu chưa tồn tại
      );
  
      res.status(200).json({ message: 'Lịch hẹn đã được xác nhận.', interview });
    } catch (err) {
      console.error('Lỗi khi xác nhận lịch hẹn:', err);
      res.status(500).json({ message: 'Lỗi server', error: err });
    }
  });
  // Lấy các khoảng thời gian có sẵn của một công việc
  router.get('/:job_id', async (req, res) => {
    try {
      const job_id = req.params.job_id;
      const availableTimes = await AvailableTime.find({ job_id, status: 'available' });
      res.json(availableTimes);
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err });
    }
  });
  // Lấy thông tin của khoảng thời gian có sẵn theo id
router.get('/time/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Tìm kiếm khoảng thời gian có sẵn theo id
    const availableTime = await AvailableTime.findById(id);

    if (!availableTime) {
      return res.status(404).json({ message: 'Không tìm thấy khoảng thời gian này.' });
    }

    // Trả về thông tin chi tiết của khoảng thời gian
    res.status(200).json(availableTime);
  } catch (err) {
    console.error('Lỗi khi lấy thông tin thời gian:', err);
    res.status(500).json({ message: 'Lỗi server', error: err });
  }
});

module.exports = router;
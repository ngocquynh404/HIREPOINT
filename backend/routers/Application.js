const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const authenticateToken = require('../middleware/authenticateToken');
const Profile = require('../models/Profile');
const mongoose = require('mongoose');
const Notification = require('../models/Notification'); 
const Job = require('../models/Job');

// POST - Tạo đơn ứng tuyển
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { job_id, cover_letter, status } = req.body;

    if (!job_id || !mongoose.Types.ObjectId.isValid(job_id)) {
      return res.status(400).json({ message: 'Invalid job ID' });
    }

    const candidate_id = req.userId; // Candidate ID from the decoded token
    if (!candidate_id) {
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }

    const application = new Application({
      job_id,
      candidate_id,
      cover_letter,
      status: status || 'đã nộp',
      applied_at: new Date(),
    });

    await application.save();

    const job = await Job.findById(job_id).populate('employer_id');
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const notification = new Notification({
      user_id: job.employer_id._id,  // Employer ID
      message: `Có một ứng viên mới ứng tuyển vào công việc "${job.title}".`,
      job_id,
    });

    await notification.save();

    req.io.emit('new-application', notification);
    req.io.to(job.employer_id._id.toString()).emit('notification', notification);

    res.status(201).json({ message: 'Application created successfully', application });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET - Lấy tất cả đơn ứng tuyển cho một công việc
router.get('/job/:jobId', async (req, res) => {
  try {
    const applications = await Application.find({ job_id: req.params.jobId })
      .populate('candidate_id', 'username email phone avatar') // Lấy thông tin ứng viên
      .exec();

    if (!applications || applications.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy ứng viên cho công việc này.' });
    }

    const result = [];
    for (let app of applications) {
      const profile = await Profile.findOne({ user_id: app.candidate_id._id }).exec();
      result.push({
        application: app,
        profile: profile || null,
        status: app.status,
      });
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'Có lỗi khi lấy danh sách ứng viên.', error: err.message });
  }
});

// PUT - Duyệt ứng viên (Không kiểm tra quyền truy cập)
router.put('/approve/:applicationId', authenticateToken, async (req, res) => {
  try {
    const applicationId = req.params.applicationId;
    const { status } = req.body;

    // Tìm đơn ứng tuyển
    const application = await Application.findById(applicationId).exec();
    if (!application) {
      return res.status(404).json({ message: 'Ứng viên không tồn tại.' });
    }

    // Cập nhật trạng thái đơn ứng tuyển nếu có giá trị mới trong request
    application.status = status || 'đang xem xét'; // Nếu không có status trong body thì mặc định là 'đang xem xét'
    
    // Lưu lại thay đổi
    await application.save();

    // Trả về kết quả
    res.json({ message: 'Đơn ứng tuyển đã được duyệt.', application });
  } catch (err) {
    res.status(500).json({ message: 'Có lỗi khi duyệt ứng viên.', error: err.message });
  }
});



// GET - Lấy tất cả đơn ứng tuyển của người dùng
router.get('/', authenticateToken, async (req, res) => {
  try {
    const applications = await Application.find({ candidate_id: req.userId })
      .populate('job_id', 'title description company_id')
      .populate('job_id.company_id', 'name location website industry')
      .exec();

    if (!applications || applications.length === 0) {
      return res.status(404).json({ message: 'Không có đơn ứng tuyển nào' });
    }

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi máy chủ', error });
  }
});

module.exports = router;

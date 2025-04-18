const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const authenticateToken = require('../middleware/authenticateToken');
const Profile = require('../models/Profile');
const Company= require('../models/Company');
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

    // Kiểm tra nếu công việc đã đóng
    const job = await Job.findById(job_id);
    if (!job) {
      return res.status(404).json({ message: 'Công việc đã đóng' });
    }

    if (job.status === 'closed') {
      return res.status(400).json({ message: 'Công việc này đã không còn tuyển dụng.' });
    }

    // Kiểm tra nếu công việc đã hết hạn
    if (job.application_deadline && new Date() > job.application_deadline) {
      return res.status(400).json({ message: 'Đã quá hạn cho nộp đơn ứng tuyển.' });
    }

    // Kiểm tra nếu ứng viên đã ứng tuyển vào công việc này rồi
    const existingApplication = await Application.findOne({ job_id, candidate_id });

    if (existingApplication) {
      // Nếu ứng tuyển trước đó bị từ chối, cho phép ứng viên ứng tuyển lại
      if (existingApplication.status === 'không trúng tuyển' || existingApplication.status === 'đã từ chối') {
        existingApplication.cover_letter = cover_letter || existingApplication.cover_letter; // Cập nhật cover letter
        existingApplication.status = status || 'đã nộp'; // Cập nhật trạng thái nếu có
        await existingApplication.save();  // Cập nhật lại ứng tuyển

        return res.status(200).json({ message: 'Application updated successfully', application: existingApplication });
      }

      // Nếu ứng viên đã ứng tuyển và chưa bị từ chối, không cho phép nộp lại
      return res.status(400).json({ message: 'Bạn đã ứng tuyển công việc này trước đó.' });
    }

    // Nếu ứng viên chưa ứng tuyển, tạo ứng tuyển mới
    const application = new Application({
      job_id,
      candidate_id,
      cover_letter,
      status: status || 'đã nộp',
      applied_at: new Date(),
    });

    await application.save();

    // Tạo thông báo cho nhà tuyển dụng
    const notification = new Notification({
      user_id: job.employer_id._id,  // Employer ID
      message: `Có một ứng viên mới ứng tuyển vào công việc "${job.title}".`,
      job_id,
    });

    await notification.save();

    // Emit sự kiện thông báo cho nhà tuyển dụng
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
router.get('/myapplicantion/:userId', async (req, res) => {
  try {
      const { userId } = req.params;

      const applications = await Application.find({ candidate_id: userId })
          .populate({
              path: 'job_id', // Populate thông tin công việc
              populate: { path: 'company_id' } // Populate thông tin công ty
          });

      res.status(200).json(applications);
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Có lỗi xảy ra khi lấy danh sách ứng tuyển.' });
  }
});



module.exports = router;

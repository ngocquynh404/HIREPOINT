const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const Company = require('../models/Company');
const Feedback = require('../models/Feedback');  
const authenticateToken = require('../middleware/authenticateToken');

// CREATE - Tạo công việc mới
router.post('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.userId;  // Lấy userId từ request (đã được gán trong middleware)
    const company_id = req.body.company_id;

    // Kiểm tra xem công ty có tồn tại không
    const company = await Company.findById(company_id);
    if (!company) {
      return res.status(400).json({ message: 'ID công ty không hợp lệ' });
    }

    // Tạo công việc mới với thông tin từ request body
    const job = new Job({
      employer_id: userId,  // Sử dụng userId từ token
      company_id,
      title: req.body.title,
      description: req.body.description,
      requirements: req.body.requirements,
      skills: req.body.skills,
      qualifications: req.body.qualifications,
      salary: req.body.salary,
      job_type: req.body.job_type,
      vacancy: req.body.vacancy,
      location: req.body.location,
      note: req.body.note,
      status: req.body.status || 'open',  // Thêm trạng thái nếu có
      application_deadline: req.body.application_deadline,  // Thêm hạn nộp đơn nếu có
    });

    // Lưu công việc vào cơ sở dữ liệu
    await job.save();
    res.status(201).json({ message: 'Tạo công việc thành công', job });
  } catch (error) {
    console.error('Error creating job:', error);  // Log lỗi chi tiết
    res.status(500).json({ message: 'Lỗi server', error });
  }
});

// READ - Lấy tất cả công việc
router.get('/', async (req, res) => {
  try {
    const { keyword, job_type, location, status } = req.query;

    let filter = {};
    if (keyword) filter.title = { $regex: keyword, $options: 'i' };
    if (job_type) filter.job_type = job_type;
    if (location) filter.location = { $regex: location, $options: 'i' };
    if (status) filter.status = status;

    const jobs = await Job.find(filter).populate('company_id');
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error });
  }
});

// READ - Lấy thông tin chi tiết công việc theo ID
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('company_id')
      .populate('feedbacks');
    if (!job) return res.status(404).json({ message: 'Công việc không tồn tại' });

    res.json(job);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error });
  }
});

// UPDATE - Cập nhật công việc
router.put('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Công việc không tồn tại' });

    const oldJobData = { ...job.toObject() }; // Store the current job data for comparison

    // Cập nhật các trường công việc
    job.title = req.body.title || job.title;
    job.description = req.body.description || job.description;
    job.requirements = req.body.requirements || job.requirements;
    job.skills = req.body.skills || job.skills;
    job.qualifications = req.body.qualifications || job.qualifications;
    job.salary = req.body.salary || job.salary;
    job.job_type = req.body.job_type || job.job_type;
    job.vacancy = req.body.vacancy || job.vacancy;
    job.location = req.body.location || job.location;
    job.note = req.body.note || job.note;
    job.status = req.body.status || job.status;
    job.application_deadline = req.body.application_deadline || job.application_deadline;
    job.benefits = req.body.benefits || job.benefits; // Assume benefits is a new field

    await job.save();

    // Check if certain fields (salary, application_deadline, or benefits) were changed
    const changedFields = [];
    if (oldJobData.salary !== job.salary) changedFields.push('salary');
    if (oldJobData.application_deadline !== job.application_deadline) changedFields.push('application_deadline');
    if (oldJobData.benefits !== job.benefits) changedFields.push('benefits');

    if (changedFields.length > 0) {
      // Find users who saved this job
      const savedJobs = await SavedJob.find({ job_id: job._id }).populate('user_id');
      const notificationMessage = `Công việc "${job.title}" đã có thay đổi: ${changedFields.join(', ')}`;

      // Create and send notifications to users who saved the job
      savedJobs.forEach(async (savedJob) => {
        const notification = new Notification({
          user_id: savedJob.user_id._id,
          message: notificationMessage,
          created_at: new Date(),
          read_status: false,
        });

        await notification.save();

        // Send real-time notification via Socket.IO
        req.io.to(savedJob.user_id._id.toString()).emit('notification', {
          message: notificationMessage,
          jobTitle: job.title,
        });
      });
    }

    res.json({ message: 'Cập nhật công việc thành công', job });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error });
  }
});

// DELETE - Xóa công việc
router.delete('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Xóa công việc
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Error deleting job:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const Company = require('../models/Company');
const Feedback = require('../models/Feedback');  
const authenticateToken = require('../middleware/authenticateToken');

// CREATE - Tạo công việc mới
// Trong API server
router.post('/', async (req, res) => {
  try {
    console.log("data insert", req.body);

    const { employer_id, company_id, title, description, requirements, skills, qualifications, salary, job_type, vacancy, location, interview_location, note, application_deadline, benefits, status } = req.body;

    // Kiểm tra xem công ty có tồn tại không
    const company = await Company.findById(company_id);
    console.log("company id: ", company_id);

    if (!company) {
      return res.status(400).json({ message: 'ID công ty không hợp lệ' });
    }

    // Tạo công việc mới
    const job = new Job({
      employer_id,
      company_id,
      title,
      description,
      requirements,
      skills,
      qualifications,
      salary,
      job_type,
      vacancy,
      location,
      interview_location,
      note,
      status: status || 'open',
      application_deadline,
      benefits,
    });

    console.log("job: ", job);

    // Lưu công việc vào cơ sở dữ liệu
    await job.save();
    res.status(201).json({ message: 'Tạo công việc thành công', job });
  } catch (error) {
    console.error('Error creating job:', error);
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

router.get('/filter', async (req, res) => {
  try {
    const { keyword, job_type, location, company_name, min_salary, max_salary, industry, skills } = req.query;

    let filter = {};

    // Filter by keyword
    if (keyword) filter.title = { $regex: keyword, $options: 'i' };

    // Filter by job type
    if (job_type) filter.job_type = job_type;

    // Filter by location
    if (location) filter.location = { $regex: location, $options: 'i' };

    // Filter by salary range
    if (min_salary && max_salary) {
      filter.salary = { $gte: parseInt(min_salary), $lte: parseInt(max_salary) };
    } else if (min_salary) {
      filter.salary = { $gte: parseInt(min_salary) };
    } else if (max_salary) {
      filter.salary = { $lte: parseInt(max_salary) };
    }

    // Filter by industry and company name
    const companyFilter = {};
    if (industry) companyFilter.industry = { $regex: industry, $options: 'i' };
    if (company_name) companyFilter.name = { $regex: company_name, $options: 'i' };

    // Fetch jobs based on filters
    const jobs = await Job.find(filter).populate({
      path: 'company_id',
      match: companyFilter,
    }).exec();

    const filteredJobs = jobs.filter((job) => job.company_id);

    res.json(filteredJobs);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error });
  }
});


//load danh sách công việc
// READ - Lấy tất cả công việc (chỉ danh sách, không filter, không phân trang)
router.get('/all', async (req, res) => {
  try {
    const jobs = await Job.find().populate('company_id'); // Lấy tất cả công việc và thông tin công ty
    res.json(jobs); // Trả về danh sách công việc
  } catch (error) {
    console.error('Error fetching all jobs:', error);
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

//lay danh sach cong viẹc của 1 cong ty 
router.get('/jobs-by-company/:companyId', async (req, res) => {
  try {
    const { companyId } = req.params; // Lấy companyId từ params
    console.log("id company: ", companyId);

    // Tìm tất cả các công việc có company_id khớp với companyId
    const jobs = await Job.find({ company_id: companyId });

    // Trả về danh sách công việc
    res.status(200).json(jobs);
  } catch (error) {
    console.error('Error fetching jobs by company:', error);
    res.status(500).json({ message: 'Lỗi khi lấy danh sách công việc.' });
  }
});

// UPDATE - Cập nhật công việc
router.put('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Công việc không tồn tại' });

    const oldJobData = { ...job.toObject() }; // Store the current job data for comparison
    console.log("oldJobData: ", oldJobData);
    console.log("req.body: ", req.body);
    console.log("job: ", job);

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
    job.interview_location = req.body.interview_location || job.interview_location;
    job.note = req.body.note || job.note;
    job.status = req.body.status || job.status;
    job.application_deadline = req.body.application_deadline || job.application_deadline;
    job.benefits = req.body.benefits || job.benefits; // Assume benefits is a new field

    await job.save();
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

router.get('/filter', async (req, res) => {
  try {
    const {
      keyword,
      job_type,
      location,
      status,
      company_name,
      min_salary,
      max_salary,
      industry,
      skills,
    } = req.query;

    // Build the filter object
    let filter = {};

    if (keyword) filter.title = { $regex: keyword, $options: 'i' };
    if (job_type) filter.job_type = job_type;
    if (location) filter.location = { $regex: location, $options: 'i' };
    if (status) filter.status = status;
    if (skills) filter.skills = { $in: skills.split(',') };
    if (min_salary || max_salary) {
      filter.salary = {};
      if (min_salary) filter.salary.$gte = Number(min_salary);
      if (max_salary) filter.salary.$lte = Number(max_salary);
    }
    
    const companyFilter = {};
    if (industry) companyFilter.industry = { $regex: industry, $options: 'i' };
    if (company_name) companyFilter.name = { $regex: company_name, $options: 'i' };

    const jobs = await Job.find(filter)
      .populate({
        path: 'company_id',
        match: companyFilter,
      })
      .exec();

    const filteredJobs = jobs.filter((job) => job.company_id);

    res.json(filteredJobs);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error });
  }
});



module.exports = router;

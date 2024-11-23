const express = require('express');
const router = express.Router();
const Company = require('../models/Company');
const User = require('../models/User');
const mongoose = require('mongoose');
const authenticateToken = require('../middleware/authenticateToken');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
// Cấu hình multer để xử lý file upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/newcompany', async (req, res) => {
  const { name, description, industry, location, website, logo, quymo } = req.body;

  // Kiểm tra nếu tất cả thông tin cần thiết đã có
  if (!name || !description || !industry || !location || !website || !logo || !quymo) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
 
  try {
    const newCompany = new Company({
      name,
      description,
      industry,
      location,
      website,
      logo,
      quymo
    });

    // Lưu công ty vào cơ sở dữ liệu
    await newCompany.save();
    res.status(201).json({ message: 'Company added successfully' });
  } catch (error) {
    console.error('Error adding company:', error);
    res.status(500).json({ message: 'Error adding company' });
  }
});
router.get('/me/:followedUser', async (req, res) => {
  try {
    const { followedUser } = req.params;  // Lấy userId từ params
    console.log('followedUser:', followedUser);  // Log userId để kiểm tra

    // Truy vấn FollowedCompany để lấy các công ty mà người dùng đã theo dõi
    const follows = await FollowedCompany.find({ user_id: followedUser })
      .populate('company_id')  // Populate thông tin công ty (company_id) từ mô hình Company
      .exec();

    console.log('Follows:', follows);  // Log kết quả populate để kiểm tra

    if (!follows || follows.length === 0) {
      return res.status(404).json({ message: 'No companies followed' });
    }

    // Lấy danh sách công ty từ các follow và trả về kết quả
    const companies = follows.map(follow => follow.company_id);

    res.status(200).json({ success: true, companies });
  } catch (error) {
    console.error('Error fetching followed companies:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// READ ALL - Lấy tất cả các công ty
router.get('/', async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// READ - Lấy thông tin công ty theo ID
router.get('/company/:id', async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.json(company);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}); 

// Lấy thông tin công ty theo userID
router.get('/:user_id', async (req, res) => {
  try {
    const { user_id } = req.params;
    const company = await Company.findOne({ user_id }).populate('user_id'); // Populate if needed

    if (!company) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.status(200).json(company);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});





// UPDATE - Cập nhật thông tin công ty
router.put('/:id', async (req, res) => {
  try {
    const { company_name, description, industry, location, specific_address,logo, website, quymo } = req.body;
    console.log ('thong tin cong ty',req.body);
    const updatedCompany = await Company.findByIdAndUpdate(
      req.params.id,
      {
        company_name,
        description,
        industry,
        location,
        specific_address,
        website,
        logo,
        banner: null,
        quymo,
        updated_at: new Date()
      },
      { new: true }
    );

    if (!updatedCompany) {
      return res.status(404).json({ message: 'Company not found' });
    }

    res.json({ message: 'Company updated successfully', company: updatedCompany });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// DELETE - Xóa công ty
router.delete('/:id', async (req, res) => {
  try {
    const deletedCompany = await Company.findByIdAndDelete(req.params.id);
    if (!deletedCompany) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.json({ message: 'Company deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});


module.exports = router;
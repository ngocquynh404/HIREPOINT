const express = require('express');
const router = express.Router();
const Company = require('../models/Company');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
// Cấu hình multer để xử lý file upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', async (req, res) => {
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
      logo, // Lưu URL logo từ Cloudinary
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
router.get('/:id', async (req, res) => {
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

// UPDATE - Cập nhật thông tin công ty
router.put('/:id', async (req, res) => {
  try {
    const { name, description, industry, location, website, logo, quymo } = req.body;

    const updatedCompany = await Company.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        industry,
        location,
        website,
        logo,
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
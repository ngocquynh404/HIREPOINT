const express = require('express');
const router = express.Router();
const FollowedCompany = require('../models/FollowedCompany');
const User = require('../models/User');
const Company = require('../models/Company');
const authenticateToken = require('../middleware/authenticateToken');  // Đảm bảo middleware authenticateToken đã được import

// POST - Theo dõi một công ty
router.post('/', authenticateToken, async (req, res) => {
  const { company_id } = req.body;  // Get company_id from the request body
  const user_id = req.userId;  // Get user_id from the authenticated token

  try {
    // Kiểm tra xem công ty đã được theo dõi hay chưa
    const existingFollow = await FollowedCompany.findOne({ user_id, company_id });

    if (existingFollow) {
      return res.status(400).json({ message: 'Bạn đã theo dõi công ty này rồi' });
    }

    // Tạo mới một bản ghi theo dõi công ty
    const newFollow = new FollowedCompany({
      user_id,
      company_id,
    });

    await newFollow.save();
    res.status(201).json({ message: 'Theo dõi công ty thành công', followedCompany: newFollow });
  } catch (error) {
    console.error('Error following company:', error);
    res.status(500).json({ message: 'Lỗi server khi theo dõi công ty', error });
  }
});

// Route to get followed companies, using the authenticateToken middleware
router.get('/followedcompanies', authenticateToken, async (req, res) => {
  try {
    const userId = req.userId;  // Access userId from the middleware
    const followedCompanies = await FollowedCompany.find({ userId });  // Query followed companies by userId
    res.json(followedCompanies);
  } catch (error) {
    console.error('Error fetching followed companies:', error);
    res.status(500).json({ message: 'Failed to fetch followed companies.' });
  }
});
router.get('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.userId; // Lấy userId từ middleware authenticateToken

    // Tìm tất cả các bản ghi công ty đã theo dõi bởi user
    const followedCompanies = await FollowedCompany.find({ user_id: userId }).populate('company_id'); // Sử dụng populate để lấy thông tin chi tiết của công ty

    // Trả về danh sách các công ty đã theo dõi
    res.json(followedCompanies);
  } catch (error) {
    console.error('Error fetching followed companies:', error);
    res.status(500).json({ message: 'Lỗi khi lấy danh sách công ty đã theo dõi', error });
  }
});

// DELETE - Hủy theo dõi một công ty
router.delete('/:id', authenticateToken, async (req, res) => {
  const userId = req.userId;  // Lấy user_id từ token

  try {
    // Tìm FollowedCompany bằng ID
    const followedCompany = await FollowedCompany.findById(req.params.id);

    console.log('Followed Company:', followedCompany);  // Kiểm tra đối tượng FollowedCompany

    // Kiểm tra xem công ty đã được theo dõi hay chưa
    if (!followedCompany) {
      return res.status(404).json({ message: 'Không tìm thấy công ty đã theo dõi.' });
    }

    // Kiểm tra xem trường user_id có hợp lệ hay không
    if (!followedCompany.user_id) {
      return res.status(400).json({ message: 'Không tìm thấy thông tin người dùng trong công ty đã theo dõi.' });
    }

    // Kiểm tra xem công ty có thuộc về người dùng hiện tại không
    if (followedCompany.user_id.toString() !== userId) {
      return res.status(403).json({ message: 'Bạn không thể hủy theo dõi công ty này.' });
    }

    // Xóa công ty khỏi danh sách theo dõi
    await FollowedCompany.findByIdAndDelete(req.params.id);

    res.json({ message: 'Công ty đã được hủy theo dõi thành công' });
  } catch (error) {
    console.error('Error while unfollowing company:', error);  // Log lỗi
    res.status(500).json({ message: 'Lỗi server khi hủy theo dõi', error: error.message || error });
  }
});

// GET - Lấy danh sách tất cả các công ty
router.get('/allcompanies', authenticateToken, async (req, res) => {
  try {
    // Truy vấn tất cả các công ty từ bảng Company
    const companies = await Company.find(); 

    // Trả về danh sách các công ty
    res.json(companies);
  } catch (error) {
    console.error('Error fetching all companies:', error);
    res.status(500).json({ message: 'Lỗi server khi lấy danh sách công ty', error });
  }
});


module.exports = router;  // Only export once

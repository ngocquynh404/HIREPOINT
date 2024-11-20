const express = require('express');
const Academic = require('../models/Academic'); // Đường dẫn tới model Academic
const authenticateToken = require('../middleware/authenticateToken'); // Middleware JWT
const router = express.Router();

// Thêm thông tin học vấn (CREATE)
router.post('/add', authenticateToken, async (req, res) => {
  try {
    const { industry, school_name, degree, start_date, end_date, achievements } = req.body;

    const newAcademic = new Academic({
      user_id: req.userId, // Lấy userId từ middleware authenticateToken
      industry,
      school_name,
      degree,
      start_date,
      end_date,
      achievements,
    });

    const savedAcademic = await newAcademic.save();
    res.status(201).json(savedAcademic);
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi thêm thông tin học vấn.' });
  }
});

// Sửa thông tin học vấn (UPDATE)
router.put('/edit/:id', authenticateToken, async (req, res) => {
  try {
    const academicId = req.params.id;

    // Tìm và cập nhật tài liệu
    const updatedAcademic = await Academic.findOneAndUpdate(
      { _id: academicId, user_id: req.userId }, // Kiểm tra quyền sở hữu bằng user_id
      req.body,
      { new: true } // Trả về tài liệu sau khi cập nhật
    );

    if (!updatedAcademic) {
      return res.status(404).json({ error: 'Không tìm thấy thông tin học vấn.' });
    }

    res.json(updatedAcademic);
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi cập nhật thông tin học vấn.' });
  }
});

// Xóa thông tin học vấn (DELETE)
router.delete('/delete/:id', authenticateToken, async (req, res) => {
  try {
    const academicId = req.params.id;

    // Tìm và xóa tài liệu
    const deletedAcademic = await Academic.findOneAndDelete({
      _id: academicId,
      user_id: req.userId, // Kiểm tra quyền sở hữu bằng user_id
    });

    if (!deletedAcademic) {
      return res.status(404).json({ error: 'Không tìm thấy thông tin học vấn để xóa.' });
    }

    res.json({ message: 'Đã xóa thành công.' });
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi xóa thông tin học vấn.' });
  }
});

module.exports = router;

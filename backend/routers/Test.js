const express = require('express');
const router = express.Router();
const Test = require('../models/Test');
const TestQuestion = require('../models/TestQuestion');
const authenticateToken = require('../middleware/authenticateToken');  // Đảm bảo đường dẫn đúng

// CREATE - Tạo bài kiểm tra mới
// CREATE - Tạo bài kiểm tra mới
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { title, description, type, duration } = req.body;
    const userId = req.userId;  // Lấy userId từ request sau khi đã xác thực token
    const newTest = new Test({
      title,
      description,
      type,
      duration,
      userId  // Gắn userId vào bài kiểm tra
    });

    await newTest.save();
    res.status(201).json({ message: 'Test created successfully', test: newTest });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});


// READ - Lấy tất cả các bài kiểm tra
router.get('/', async (req, res) => {
  try {
    const tests = await Test.find();
    res.json(tests);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// READ - Lấy thông tin chi tiết bài kiểm tra theo ID
router.get('/:id', async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);
    if (!test) return res.status(404).json({ message: 'Test not found' });

    res.json(test);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// UPDATE - Cập nhật bài kiểm tra theo ID
router.put('/:id', async (req, res) => {
  try {
    const { title, description, type, duration } = req.body;
    const updatedTest = await Test.findByIdAndUpdate(
      req.params.id,
      { title, description, type, duration, updated_at: Date.now() },
      { new: true }
    );

    if (!updatedTest) return res.status(404).json({ message: 'Test not found' });

    res.json({ message: 'Test updated successfully', updatedTest });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// DELETE - Xóa bài kiểm tra theo ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedTest = await Test.findByIdAndDelete(req.params.id);
    if (!deletedTest) return res.status(404).json({ message: 'Test not found' });

    res.json({ message: 'Test deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Tìm kiếm bài kiểm tra theo loại
router.get('/search', async (req, res) => {
  try {
    const { type } = req.query;
    let filter = {};
    if (type) filter.type = type;

    const tests = await Test.find(filter);
    res.json(tests);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

router.get('/:testId/questions', async (req, res) => {
  try {
    const { testId } = req.params;

    const questions = await TestQuestion.find({ test_id: testId });
    
    if (!questions || questions.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy câu hỏi cho bài kiểm tra này' });
    }

    // Assuming each test has a duration in minutes
    const test = await Test.findById(testId);
    const duration = test ? test.duration : 0; 

    res.json({ questions, duration });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error });
  }
});

module.exports = router;

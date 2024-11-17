const express = require('express');
const router = express.Router();
const Report = require('../models/Report');

// CREATE - Tạo một báo cáo mới
router.post('/', async (req, res) => {
  try {
    const { total_jobs, total_applications, total_users } = req.body;
    const newReport = new Report({ total_jobs, total_applications, total_users });
    await newReport.save();
    res.status(201).json({ message: 'Report created successfully', newReport });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// READ - Lấy tất cả báo cáo
router.get('/', async (req, res) => {
  try {
    const reports = await Report.find();
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// READ - Lấy báo cáo theo ID
router.get('/:id', async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) return res.status(404).json({ message: 'Report not found' });
    res.json(report);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// UPDATE - Cập nhật một báo cáo
router.put('/:id', async (req, res) => {
  try {
    const { total_jobs, total_applications, total_users } = req.body;
    const updatedReport = await Report.findByIdAndUpdate(
      req.params.id,
      { total_jobs, total_applications, total_users },
      { new: true }
    );
    if (!updatedReport) return res.status(404).json({ message: 'Report not found' });
    res.json({ message: 'Report updated successfully', updatedReport });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// DELETE - Xóa một báo cáo
router.delete('/:id', async (req, res) => {
  try {
    const deletedReport = await Report.findByIdAndDelete(req.params.id);
    if (!deletedReport) return res.status(404).json({ message: 'Report not found' });
    res.json({ message: 'Report deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;

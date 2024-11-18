const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Profile = require('../models/Profile');
const User = require('../models/User');
const authenticateToken = require('../middleware/authenticateToken');

// GET all profiles (if needed)
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user_id');
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// POST create a new profile
router.post('/', authenticateToken, async (req, res) => {
  try {
    console.log('Received data:', req.body); // Log incoming data from the client

    const { full_name, address, education, experience, skills, cv_file, industry } = req.body; // Include industry in the request body

    // Check if the profile already exists for the user
    const existingProfile = await Profile.findOne({ user_id: req.userId });
    if (existingProfile) {
      console.log('Profile already exists for user:', req.userId); // Log if profile exists
      return res.status(400).json({ message: 'Profile already exists' });
    }

    // Create new profile
    const profile = new Profile({
      user_id: req.userId,
      full_name,
      address,
      education,
      experience,
      skills,
      cv_file,
      industry // Save industry data
    });

    await profile.save();
    console.log('Profile created successfully:', profile);  // Log successfully created profile
    res.status(201).json({ message: 'Profile created successfully', profile });
  } catch (error) {
    console.error('Error creating profile:', error);  // Log error details
    res.status(500).json({ message: 'Server error', error });
  }
});

// GET profile by user ID (job details for user)
router.get('/job/:userId', async (req, res) => {
  try {
    const profile = await Profile.findOne({ user_id: req.params.userId });

    if (!profile) {
      return res.status(404).json({ message: 'Profile không tồn tại.' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Có lỗi khi lấy thông tin profile.' });
  }
});

// GET profile by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid profile ID' });
  }

  try {
    const profile = await Profile.findById(id).populate('user_id');
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

// PUT update profile by ID
router.put('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { full_name, address, education, experience, skills, cv_file, industry } = req.body; // Include industry in the request body

  // Kiểm tra ObjectId hợp lệ
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid profile ID' });
  }

  try {
    const profile = await Profile.findById(id);
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    // Kiểm tra quyền truy cập
    if (profile.user_id.toString() !== req.userId) {
      return res.status(403).json({ message: 'You are not authorized to edit this profile' });
    }

    // Cập nhật hồ sơ
    const updatedProfile = await Profile.findByIdAndUpdate(
      id,
      { 
        full_name, 
        address, 
        education, 
        experience, 
        skills, 
        cv_file, 
        industry, // Update industry
        updated_at: new Date() 
      },
      { new: true } // Trả về hồ sơ đã được cập nhật
    );

    res.json({ message: 'Profile updated successfully', profile: updatedProfile });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

// DELETE profile by ID
router.delete('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid profile ID' });
  }

  try {
    const profile = await Profile.findById(id);
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    // Ensure the user can only delete their own profile
    if (profile.user_id.toString() !== req.userId) {
      return res.status(403).json({ message: 'You are not authorized to delete this profile' });
    }

    await Profile.findByIdAndDelete(id);
    res.json({ message: 'Profile deleted successfully' });
  } catch (error) {
    console.error('Error deleting profile:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

// GET full user information after login
router.get('/me/full', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('profile'); // Populate nếu cần thông tin hồ sơ
    if (!user) {
      return res.status(404).json({ message: 'Người dùng không tồn tại' });
    }
    res.json({
      userId: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      fullName: user.profile ? user.profile.full_name : null,
      industry: user.profile ? user.profile.industry : null, // Include industry in the response
      // Các thông tin khác từ Profile
    });
  } catch (err) {
    console.error('Lỗi khi lấy thông tin người dùng:', err);
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
});

module.exports = router;

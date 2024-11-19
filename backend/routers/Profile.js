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
// Route tạo hồ sơ mới
router.post('/create', authenticateToken, async (req, res) => {
  try {
    const { first_name, last_name, email, phone, nationality, date_of_birth, location, job_title, job_level, experience, skills, cv_files } = req.body;

    // Kiểm tra xem người dùng đã có profile chưa
    let profile = await Profile.findOne({ user_id: req.userId });

    if (profile) {
      return res.status(400).json({ message: 'Profile already exists' });  // Nếu profile đã tồn tại, không tạo lại
    }

    // Nếu chưa có profile, tạo mới
    profile = new Profile({
      user_id: req.userId,
      first_name,
      last_name,
      email,
      phone,
      nationality,
      date_of_birth,
      location,
      job_title,
      job_level,
      experience,
      skills,
      cv_files
    });

    await profile.save();
    return res.status(201).json({ message: 'Profile created successfully', profile });
  } catch (error) {
    console.error('Error creating profile:', error);
    return res.status(500).json({ message: 'Error creating profile', error });
  }
});

// Route cập nhật hồ sơ (vẫn giữ)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { first_name, last_name, email, phone, nationality, date_of_birth, location, job_title, job_level, experience, skills, cv_files } = req.body;

    // Kiểm tra xem người dùng đã có profile chưa
    let profile = await Profile.findOne({ user_id: req.userId });

    if (profile) {
      // Nếu người dùng đã có profile, cập nhật thông tin
      profile.first_name = first_name || profile.first_name;
      profile.last_name = last_name || profile.last_name;
      profile.email = email || profile.email;
      profile.phone = phone || profile.phone;
      profile.nationality = nationality || profile.nationality;
      profile.date_of_birth = date_of_birth || profile.date_of_birth;
      profile.location = location || profile.location;
      profile.job_title = job_title || profile.job_title;
      profile.job_level = job_level || profile.job_level;
      profile.experience = experience || profile.experience;
      profile.skills = skills || profile.skills;
      profile.cv_files = cv_files || profile.cv_files;

      await profile.save();
      return res.status(200).json({ message: 'Profile updated successfully', profile });
    } else {
      // Nếu người dùng chưa có profile, tạo mới
      profile = new Profile({
        user_id: req.userId,
        first_name,
        last_name,
        email,
        phone,
        nationality,
        date_of_birth,
        location,
        job_title,
        job_level,
        experience,
        skills,
        cv_files
      });

      await profile.save();
      return res.status(201).json({ message: 'Profile created successfully', profile });
    }
  } catch (error) {
    console.error('Error processing profile:', error);
    return res.status(500).json({ message: 'Error processing profile', error });
  }
});
router.get('/list', authenticateToken, async (req, res) => {
  try {
    // Find the profile for the logged-in user using their userId
    const profile = await Profile.findOne({ user_id: req.userId });

    if (!profile) {
      return res.status(404).json({ message: 'No profile found for this user' });
    }

    return res.status(200).json(profile);  // Return the logged-in user's profile
  } catch (error) {
    console.error('Error fetching profile:', error);
    return res.status(500).json({ message: 'Error fetching profile', error });
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

router.get('/me', authenticateToken, async (req, res) => {
  try {
    const userId = req.userId;  // Make sure req.userId exists and is valid
    const profile = await Profile.findOne({ user_id: mongoose.Types.ObjectId(userId) });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.status(200).json(profile);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

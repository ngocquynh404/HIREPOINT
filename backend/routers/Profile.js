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
router.put('/update-skills', async (req, res) => {
  try {
      const { userId, skills } = req.body;

      // Kiểm tra nếu thiếu thông tin
      if (!userId || !skills) {
          return res.status(400).json({ message: 'Thông tin kỹ năng không hợp lệ.' });
      }

      // Tìm profile của người dùng và cập nhật kỹ năng
      const profile = await Profile.findOne({ user_id: userId });

      if (!profile) {
          return res.status(404).json({ message: 'Không tìm thấy profile của người dùng.' });
      }

      // Cập nhật danh sách kỹ năng
      profile.skills = skills;

      // Lưu thông tin mới
      await profile.save();

      res.status(200).json({ message: 'Cập nhật kỹ năng thành công.', profile });
  } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ message: 'Lỗi khi cập nhật kỹ năng.', error: error.message });
  }
});

router.get('/skills/:userId', async (req, res) => {
  try {
    const { userId } = req.params;  // Lấy userId từ URL
    const profile = await Profile.findOne({ user_id: userId });

    if (!profile) {
      return res.status(404).json({ message: "User profile not found." });
    }

    // Trả về kỹ năng của người dùng
    res.json({ skills: profile.skills });
  } catch (error) {
    console.error("Error fetching skills:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post('/profile', async (req, res) => {
  const { user_id, first_name, last_name, email, phone,
    nationality, date_of_birth, location, specific_address, job_title,
    job_level, current_industry, current_field, years_of_experience, 
    current_salary, desired_work_location, desired_salary, education,
    experience, skills, cv_files } = req.body;

  // Kiểm tra các trường bắt buộc có bị thiếu không
  if (!user_id || !first_name || !last_name || !email || !phone) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Tìm profile của người dùng
    let profile = await Profile.findOne({ user_id });

    if (profile) {
      // Nếu đã có profile, cập nhật thông tin
      profile.first_name = first_name || profile.first_name;
      profile.last_name = last_name || profile.last_name;
      profile.email = email || profile.email;
      profile.phone = phone || profile.phone;
      profile.nationality = nationality || profile.nationality;
      profile.date_of_birth = date_of_birth || profile.date_of_birth;
      profile.location = location || profile.location;
      profile.specific_address = specific_address || profile.specific_address;
      profile.job_title = job_title || profile.job_title;
      profile.job_level = job_level || profile.job_level;
      profile.current_industry = current_industry || profile.current_industry;
      profile.current_field = current_field || profile.current_field;
      profile.years_of_experience = years_of_experience || profile.years_of_experience;
      profile.current_salary = current_salary || profile.current_salary;
      profile.desired_work_location = desired_work_location || profile.desired_work_location;
      profile.desired_salary = desired_salary || profile.desired_salary;
      profile.education = education || profile.education;
      profile.experience = experience && experience.length > 0 ? experience : profile.experience;
      profile.skills = skills && skills.length > 0 ? skills : profile.skills;
      profile.cv_files = cv_files || profile.cv_files;

      await profile.save();
      return res.status(200).json({ success: true, message: 'Profile updated successfully', profile });
    } else {
      // Nếu chưa có profile, tạo mới
      profile = new Profile({
        user_id,
        first_name,
        last_name,
        email,
        phone,
        nationality,
        date_of_birth,
        location,
        specific_address,
        job_title,
        job_level,
        current_industry,
        current_field,
        years_of_experience,
        current_salary,
        desired_work_location,
        desired_salary,
        education,
        experience: experience && experience.length > 0 ? experience : [],
        skills: skills && skills.length > 0 ? skills : [],
        cv_files
      });

      await profile.save();
      return res.status(201).json({ success: true, message: 'Profile created successfully', profile });
    }
  } catch (err) {
    console.error('Error occurred:', err.message); // Log chi tiết lỗi
    if (err.name === 'ValidationError') {
      return res.status(400).json({ success: false, message: 'Validation error', details: err.errors });
    }
    return res.status(500).json({ success: false, message: 'Server error', error: err.message });
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
router.get('/:user_id', async (req, res) => {
  try {
    const { user_id } = req.params;
    const profile = await Profile.findOne({ user_id }).populate('user_id'); // Populate if needed

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.status(200).json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Server error' });
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

router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user_id: req.userId });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.status(200).json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/follower-profiles', async (req, res) => {
  try {
    const { userIds } = req.body; // Lấy danh sách userId từ yêu cầu
    console.log("follower: ", userIds);
    const profiles = await Profile.find({ user_id: { $in: userIds } }); // Tìm tất cả profile theo danh sách userId
    res.json(profiles); // Trả về danh sách profiles
  } catch (error) {
    console.error('Error fetching profiles:', error);
    res.status(500).json({ message: 'Failed to fetch profiles.' });
  }
});

// GET all profiles with role "applicant"
router.get('/profile-user/alls', async (req, res) => {
  try {
    // Lọc các profiles mà User có role là "applicant"
    const profiles = await Profile.find()
      .populate({
        path: 'user_id', // Giả sử profile có trường 'user_id' tham chiếu đến User
        match: { role: 'applicant' }, // Lọc User có role là "applicant"
        select: 'role' // Chỉ lấy thông tin về role của User
      })
      .exec(); // Thực thi truy vấn

    // Lọc bỏ những profile không có user_id hoặc role không phải là "applicant"
    const filteredProfiles = profiles.filter(profile => profile.user_id);

    // Kiểm tra nếu không có profile nào
    if (filteredProfiles.length === 0) {
      return res.status(404).json({ message: 'No profiles found with role "applicant"' });
    }

    return res.status(200).json({ success: true, profiles: filteredProfiles });
  } catch (error) {
    console.error('Error fetching all profiles:', error);
    return res.status(500).json({ success: false, message: 'Server error', error });
  }
});

// GET profile by applicantId
router.get('/applicant/:applicantId', async (req, res) => {
  try {
    const { applicantId } = req.params; // Get applicantId from the request parameters
    const profile = await Profile.findOne({ _id: applicantId }).populate('_id'); // Find profile by user_id (applicantId)

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found for the given applicantId' });
    }

    res.status(200).json(profile); // Return the found profile
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});
router.get('/filter', async (req, res) => {
  try {
    const { specific_address, job_title, job_level, years_of_experience, skills } = req.query;

    let filter = {};
    console.log('Filter request received:', req.query);
    const applicantUsers = await User.find({ role: 'applicant' }).select('_id');
    const applicantIds = applicantUsers.map((user) => user._id);

    // Đảm bảo `applicantIds` là một mảng hợp lệ
    if (applicantIds.length > 0) {
      filter.user_id = { $in: applicantIds };
    } else {
      console.error('No applicant IDs found.');
      return res.status(400).json({ message: 'Không tìm thấy ứng viên.' });
    }

    // Thêm các bộ lọc khác nếu hợp lệ
    if (specific_address && specific_address.trim()) {
      filter.specific_address = { $regex: specific_address, $options: 'i' };
    }
    if (job_title && job_title.trim()) {
      filter.job_title = { $regex: job_title, $options: 'i' };
    }
    if (job_level && job_level.trim()) {
      filter.job_level = { $regex: job_level, $options: 'i' };
    }
    if (years_of_experience) {
      const years = parseInt(years_of_experience);
      if (!isNaN(years)) filter.years_of_experience = years;
    }
    if (skills && skills.trim()) {
      const skillsArray = skills.split(',');
      filter.skills = { $in: skillsArray };
    }

    const profiles = await Profile.find(filter).exec();
    res.json(profiles);
  } catch (error) {
    console.error('Error filtering profiles:', error);
    res.status(500).json({ message: 'Lỗi server', error });
  }
});



module.exports = router;

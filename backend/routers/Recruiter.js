const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Company = require('../models/Company');
const Profile = require('../models/Profile');
const User = require('../models/User');

router.post('/register', async (req, res) => {
    try {
        const {
            username,
            password,
            email,
            phone,
            first_name,
            last_name,
            company_name,
            industry,
            location,
        } = req.body;

        // Kiểm tra tài khoản đã tồn tại
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email đã tồn tại' });
        }

        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);

        // Tạo người dùng mới
        const user = new User({
            username,
            password: hashedPassword,
            role: 'recruiter', // Mặc định là recruiter
            email,
            phone,
            avatar: null,
            created_at: new Date(),
            updated_at: new Date(),
        });

        // Lưu người dùng
        const savedUser = await user.save();

        // Tạo profile
        const profile = new Profile({
            user_id: savedUser._id,
            first_name,
            last_name,
            email,
            phone,
        });

        // Lưu profile
        await profile.save();

        // Tạo company
        const company = new Company({
            user_id: savedUser._id,
            company_name,
            industry,
            location,
        });

        // Lưu company
        await company.save();

        // Trả về phản hồi thành công
        res.status(201).json({ message: 'Đăng ký thành công!' });
    } catch (error) {
        console.error("Lỗi khi đăng ký:", error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;

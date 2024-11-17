const express = require('express');
const bcrypt = require ('bcrypt');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const mongoose = require('mongoose');
const authenticateToken = require('../middleware/authenticateToken');

const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';

// DANG KY
router.post('/register', async (req, res) => {
  try {
      const { username, password, role, email, phone, avatar } = req.body;

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
        role,
        email,
        phone,
        avatar,
        created_at: new Date(),
        updated_at: new Date(),
      });

      await user.save();
      res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
      console.error("Lỗi khi đăng ký:", error);
      res.status(500).json({ message: 'Server error', error: error.message });
  }
});


//LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Dữ liệu gửi lên:', req.body);

    // Kiểm tra người dùng với email
    const user = await User.findOne({ email });
    console.log('Tìm thấy user:', user);
    if (!user) {
      return res.status(400).json({ message: 'Email hoặc mật khẩu không hợp lệ' });
    }

    // So sánh mật khẩu người dùng nhập và mật khẩu đã mã hóa
    console.log('Mật khẩu nhập vào:', password);
    console.log('Mật khẩu từ database:', user.password);
    
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Kết quả so sánh mật khẩu:', isMatch);
    
    if (!isMatch) {
      return res.status(400).json({ message: 'Mật khẩu hoặc email không hợp lệ' });
    }

    // Tạo token và trả về cho người dùng
    const token = jwt.sign({ userId: user._id }, 'secretkey', { expiresIn: '1h' });
    res.json({ message: 'Đăng nhập thành công', 
      token , 
      userId: user._id,
      role: user.role
    });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error });
  }
});

// GET ALL USERS
router.get('/', async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });
  
  router.get('/:id', authenticateToken, async (req, res) => {
    try {
      const userId = req.userId; 
      const user = await User.findById(userId); 
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });

// UPDATE USER
router.put('/:id', async (req, res) => {
  try {
    const { username, role, email, phone, avatar } = req.body;

    if (!username || !email) {
      return res.status(400).json({ message: 'Username and email are required' });
    }

    let updatedFields = { username, role, email, phone, updated_at: new Date() };

    // Nếu có avatar mới, bao gồm nó vào trường cập nhật
    if (avatar) {
      updatedFields.avatar = avatar;
    }

    // Cập nhật thông tin người dùng mà không thay đổi mật khẩu
    const updatedUser = await User.findByIdAndUpdate(req.params.id, updatedFields, { new: true });
    if (!updatedUser) {
      console.log('User not found with ID:', req.params.id);
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error during user update:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// DELETE USER
router.delete('/:id', async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });
  router.post('/logout', (req, res) => {
    try {
      // Clear the token cookie from the client's browser
      res.clearCookie('token', { path: '/' });
      res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
      console.error('Error during logout:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });
 // Cập nhật mật khẩu
router.put('/update-password/:id', async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    // Nếu không có mật khẩu cũ, mặc định là "1234"
    const passwordToCompare = oldPassword ;

    if (!newPassword || !confirmPassword) {
      return res.status(400).json({ message: 'Vui lòng nhập mật khẩu mới và xác nhận mật khẩu.' });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'Mật khẩu mới và mật khẩu xác nhận không khớp.' });
    }

    // Tìm người dùng theo ID
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Người dùng không tồn tại.' });
    }

    // Nếu mật khẩu cũ là mặc định "1234", bỏ qua kiểm tra với mật khẩu hiện tại
    let isMatch = false;
    if (passwordToCompare === defaultOldPassword) {
      isMatch = true; // Bỏ qua việc so sánh mật khẩu nếu là "1234"
    } else {
      // So sánh mật khẩu cũ (hoặc mật khẩu mặc định) với mật khẩu hiện tại
      isMatch = await bcrypt.compare(passwordToCompare, user.password);
    }

    if (!isMatch) {
      return res.status(400).json({ message: 'Mật khẩu cũ không đúng.' });
    }

    // Mã hóa mật khẩu mới
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Cập nhật mật khẩu mới vào cơ sở dữ liệu
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Mật khẩu đã được cập nhật thành công.' });
  } catch (error) {
    console.error('Lỗi khi cập nhật mật khẩu:', error);
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
});

router.get('/me', authenticateToken, async (req, res) => {
  try {
    // Tìm người dùng trong cơ sở dữ liệu bằng userId từ token
    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Trả về thông tin người dùng
    res.json({
      userId: user._id,
      username: user.username,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      // Có thể thêm các trường khác như địa chỉ, phone...
    });
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports= router;
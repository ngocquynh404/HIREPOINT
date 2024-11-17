require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./routers/User');

const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloudinary_url: process.env.CLOUDINARY_URL,
});
const app = express();
app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization','test_id'],
}));
app.use(express.json());

app.use('/api/users', User);

mongoose.connect('mongodb://localhost:27017/hirepoint', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("Could not connect to MongoDB:", err));

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    position: { type: String },
    company: { type: String},
    describe: { type: String },
    startMonth: { type: String },
    endMonth: { type: String, default: null },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Experience', experienceSchema);

const mongoose = require('mongoose');

const academicSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Tham chiếu tới model User
        required: true,
    },
    industry: {
        type: String,
        required: true,
        trim: true,
    },
    school_name: {
        type: String,
    },
    degree: {
        type: String,
    },
    start_date: {
        type: String,
    },
    end_date: {
        type: String,

    },
    achievements: {
        type: String,
        trim: true,
    },
}, {
    timestamps: true,
});

const Academic = mongoose.model('Academic', academicSchema);

module.exports = Academic;

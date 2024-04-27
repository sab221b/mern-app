const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, unique: true, sparse: true },
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Profile'
    },
    lastLoginAt: { type: Date },
    createdAt: { type: Date }
});

module.exports = mongoose.model('User', userSchema);
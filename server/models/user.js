const mongoose = require('mongoose');
const { addDefaultProperties } = require('../middleware/addDefaultProperties');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, unique: true, sparse: true },
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Profile'
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Role'
    },
    lastLoginAt: { type: Date }
});
addDefaultProperties(userSchema);

module.exports = mongoose.model('User', userSchema);
const mongoose = require('mongoose');

var profileSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    gender: { type: String, enum: ["male", "female", "other"] },
    date_of_birth: { type: Date },
});

module.exports = mongoose.model('Profile', profileSchema);
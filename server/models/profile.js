const mongoose = require('mongoose');
const { addDefaultProperties } = require('../middleware/addDefaultProperties');

const profileSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    gender: { type: String, enum: ["male", "female", "other"] },
    date_of_birth: { type: Date }
});
addDefaultProperties(profileSchema);

module.exports = mongoose.model('Profile', profileSchema);
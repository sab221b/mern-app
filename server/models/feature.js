const mongoose = require('mongoose');
const { addDefaultProperties } = require('../middleware/addDefaultProperties');

const featureSchema = new mongoose.Schema({
    name: { type: String, unique: true, sparse: true, required: true },
    key: { type: String, unique: true, sparse: true, required: true },
    description: { type: String },
});
addDefaultProperties(featureSchema);

module.exports = mongoose.model('Feature', featureSchema);
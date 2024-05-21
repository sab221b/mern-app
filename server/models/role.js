const mongoose = require('mongoose');
const { addDefaultProperties } = require('../middleware/addDefaultProperties');

const roleSchema = new mongoose.Schema({
    name: { type: String, unique: true, sparse: true, required: true },
    description: { type: String },
    features: [{ type: mongoose.Schema.Types.Mixed }]
});
addDefaultProperties(roleSchema);

module.exports = mongoose.model('Role', roleSchema);
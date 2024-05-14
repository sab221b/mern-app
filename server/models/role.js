const mongoose = require('mongoose');

var roleSchema = new mongoose.Schema({
    name: { type: String, unique: true, sparse: true, required: true },
    description: { type: String },
    features: [{ type: mongoose.Schema.Types.Mixed }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    isDeleted: { type: Boolean, default: false }
});

module.exports = mongoose.model('Role', roleSchema);
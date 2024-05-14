const mongoose = require('mongoose');

const agentTypeSchema = new mongoose.Schema({
    name: { type: String, unique: true, sparse: true, required: true },
    description: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    isDeleted: { type: Boolean, default: false }
});

module.exports = mongoose.model('AgentType', agentTypeSchema);
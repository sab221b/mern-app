const mongoose = require('mongoose');
const { addDefaultProperties } = require('../middleware/addDefaultProperties');

const agentTypeSchema = new mongoose.Schema({
    name: { type: String, unique: true, sparse: true, required: true },
    description: { type: String }
});
addDefaultProperties(agentTypeSchema);

module.exports = mongoose.model('AgentType', agentTypeSchema);
const mongoose = require('mongoose');
const { addDefaultProperties } = require('../middleware/addDefaultProperties');

const brokerageSchema = new mongoose.Schema({
    from: { type: mongoose.Schema.Types.Mixed },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    description: { type: String },
    percent: { type: Number, required: true },
    amount: { type: Number, required: true }
});
addDefaultProperties(brokerageSchema);

module.exports = mongoose.model('Brokerage', brokerageSchema);
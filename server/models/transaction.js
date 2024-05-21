const mongoose = require('mongoose');
const { addDefaultProperties } = require('../middleware/addDefaultProperties');

const transactionSchema = new mongoose.Schema({
    status: { type: String, required: true },
    description: { type: String },
    bill_number: { type: String },
    amount: { type: String },
    from: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Profile'
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Profile'
    }
});
addDefaultProperties(transactionSchema);

module.exports = mongoose.model('Transaction', transactionSchema);
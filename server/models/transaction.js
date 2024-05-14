const mongoose = require('mongoose');

var transactionSchema = new mongoose.Schema({
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
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    isDeleted: { type: Boolean, default: false }
});

module.exports = mongoose.model('Transaction', transactionSchema);
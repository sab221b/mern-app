const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { addDefaultProperties } = require('../middleware/addDefaultProperties');

const cartSchema = new mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
        _id: false,
        product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
        unitPrice: { type: Number, required: true },
        amount: { type: Number, required: true },
    }],
    active: { type: Boolean, required: true }
});
addDefaultProperties(cartSchema);

module.exports = mongoose.model('Cart', cartSchema);
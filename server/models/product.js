const mongoose = require('mongoose');
const { addDefaultProperties } = require('../middleware/addDefaultProperties');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    category: [{ type: mongoose.Schema.Types.Mixed }],
    brand: { type: String, required: true },
    attributes: {
        type: Map,
        of: Schema.Types.Mixed
    },
    stock_quantity: { type: Number, default: 0 },
    images: { type: [String], default: [] },
    reviews: [{
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        rating: { type: Number, required: true },
        comment: { type: String }
    }]
});
addDefaultProperties(productSchema);

module.exports = mongoose.model('Profile', productSchema);
// addFeatures.js
const mongoose = require('mongoose');
const Feature = require('../models/feature');
require('dotenv').config();
mongoose.connect(`mongodb://localhost:27017/${process.env.APP_NAME}`);

// Array of features to be inserted
const features = [
    { name: 'user management', key: 'user', description: "User management feature" },
    { name: 'role management', key: 'role', description: "Role management feature" },
    { name: 'product management', key: 'product', description: "Product management feature" },
    { name: 'agent management', key: 'agent', description: "Agent management feature" },
    { name: 'quotation generator', key: 'quotation', description: "Quotation generation feature" },
    { name: 'bill generator', key: 'bill', description: "Bill generation feature" },
    { name: 'transaction management', key: 'transaction', description: "Transaction management feature" },
    // Add more features as needed
];

exports.createFeatures = () => {
    return new Promise(async (resolve, reject) => {
        try {
            await Feature.insertMany(features);
            console.log('Features added successfully');
            resolve();
        } catch (err) {
            if (err.code === 11000) {
                resolve();
            } else if (err.code !== 11000) {
                console.error('Error adding features', err);
                reject(err); // Reject the promise with the error
            }
        }
    });
}

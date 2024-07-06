// addFeatures.js
const mongoose = require('mongoose');
const Feature = require('../models/feature');
require('dotenv').config();
mongoose.connect(`mongodb://localhost:27017/${process.env.APP_NAME}`);

// Array of features to be inserted
const features = [
    { name: 'user management', key: 'user', description: "User management feature" },
    { name: 'role management', key: 'role', description: "Role management feature" },
    { name: 'products', key: 'product', description: "Products" },
    { name: 'agent management', key: 'agent', description: "Agent management feature" },
    { name: 'quotations', key: 'quotation', description: "Quotations" },
    { name: 'bills', key: 'bill', description: "Bills" },
    { name: 'transactions', key: 'transaction', description: "Transactions" },
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

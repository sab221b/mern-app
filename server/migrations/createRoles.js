// addRoles.js
const mongoose = require('mongoose');
const Role = require('../models/role');
require('dotenv').config();

mongoose.connect(`mongodb://localhost:27017/${process.env.APP_NAME}`);

// Array of roles to be inserted
const roles = [
    { name: 'admin', features: ["all"], description: "Admin role with access to all features" },
    { name: 'shop owner', features: [], description: "Shop owner role with access to shop related features" },
    { name: 'product owner', features: [], description: "Product owner role with access to product related features" },
    { name: 'general user', features: [], description: "user role with limited access" },
    // Add more roles as needed
];

// Insert roles into the database
exports.createRoles = () => {
    return new Promise(async (resolve, reject) => {
        try {
            await Role.insertMany(roles);
            console.log('Roles added successfully');
            resolve();
        } catch (err) {
            if (err.code === 11000) {
                resolve();
            } else if (err.code !== 11000) {
                console.error('Error adding roles', err);
                reject(err); // Reject the promise with the error
            }
        }
    });
};

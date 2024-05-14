// addFeatures.js
const mongoose = require('mongoose');
const Feature = require('../models/feature');
require('dotenv').config();
mongoose.connect(`mongodb://localhost:27017/${process.env.APP_NAME}`);

// Array of features to be inserted
const features = [
    { name: 'agent Management', description: "Agent management feature" },
    { name: 'product Management', description: "Product management feature" },
    { name: 'quotation Generator', description: "Quotation generation feature" },
    { name: 'bill Generator', description: "Bill generation feature" },
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
                return;
            }
            reject(err);
        }

        // .then(() => {
        //     console.log('Features added successfully');
        //     resolve(); // Resolve the promise with the result of insertMany
        // })
        // .catch(err => {
        //     if (err.code === 11000) {
        //         resolve();
        //     }
        //     console.error('Error adding features', err);
        //     reject(err); // Reject the promise with the error
        // });
    });
}

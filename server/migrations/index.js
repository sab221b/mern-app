const mongoose = require('mongoose');
const { createFeatures } = require('./createFeatures')
const { createRoles } = require('./createRoles');
const { createAdmin, createUser } = require('./createAdmin');
require('dotenv').config();

mongoose.connect(`mongodb://localhost:27017/${process.env.APP_NAME}`);

function runMigrations() {
    Promise.all([createFeatures(), createRoles(), createAdmin(), createUser()])
        .then(() => {
            console.log('migrations executed successfully.');
        })
        .catch(err => {
            console.error('Error executing migrations', err);
        })
        .finally(() => {
            mongoose.disconnect();
        })
};

runMigrations();

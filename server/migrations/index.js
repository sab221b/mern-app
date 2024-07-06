const mongoose = require('mongoose');
const { createFeatures } = require('./createFeatures')
const { createRoles, addPermissions } = require('./createRoles');
const { createAdmin, createUser, createAgent, createSuperAdmin } = require('./createUsers');
require('dotenv').config();

mongoose.connect(`mongodb://localhost:27017/${process.env.APP_NAME}`);

function runMigrations() {
    Promise.all([createFeatures(), createRoles(), addPermissions(), createSuperAdmin(), createAdmin(), createUser()])
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

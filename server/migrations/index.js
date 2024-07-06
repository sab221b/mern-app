const mongoose = require('mongoose');
const { createFeatures } = require('./createFeatures')
const { createRoles, addPermissions } = require('./createRoles');
const { createAdmin, createUser, createSuperAdmin } = require('./createUsers');
require('dotenv').config();

mongoose.connect(`mongodb://localhost:27017/${process.env.APP_NAME}`);

async function runMigrations() {
    const tasks = [
        Promise.all([
            createFeatures(),
            createRoles()
        ]).then(() => addPermissions()),
        createSuperAdmin(),
        createAdmin(),
        createUser()
    ]
    for (let task of tasks) {
        await task;
    }
};

runMigrations()
    .then(() => {
        console.log('migrations executed successfully.');
    })
    .catch(err => {
        console.error('Error executing migrations', err);
    })
    .finally(() => {
        mongoose.disconnect();
    })

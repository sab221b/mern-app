// createAdmin.js
const mongoose = require('mongoose');
const User = require('../models/user');
const Profile = require('../models/profile');
const Role = require('../models/role');
const { encryptPassword } = require('../middleware/password');
require('dotenv').config();

mongoose.connect(`mongodb://localhost:27017/${process.env.APP_NAME}`);


const adminPayload = {
    email: `admin.${process.env.APP_NAME}@gmail.com`,
    phone: "9876543210",
    password: "admin@123",
    profile: {
        firstname: "admin",
        lastname: `${process.env.APP_NAME}`,
        gender: "other"
    }
}

exports.createAdmin = () => {
    return new Promise(async (resolve, reject) => {
        const user = await User.findOne({ email: adminPayload.email });
        if (!user) {
            const profile = new Profile(adminPayload.profile);
            const savedProfile = await profile.save();
            const hash = await encryptPassword(adminPayload.password);
            const adminUser = new User();
            adminUser.email = adminPayload.email;
            adminUser.phone = adminPayload.phone;
            adminUser.password = hash;
            adminUser.profile = savedProfile._id;
            adminUser.createdAt = new Date().toISOString();
            const adminRole = await Role.findOne({ name: 'admin' })
            adminUser.role = adminRole._id;
            await adminUser.save()
                .then(() => {
                    console.log('Admin added successfully');
                    resolve();
                })
                .catch(async err => {
                    if (err.code === 11000) {
                        const deleteProfile = await Profile.findByIdAndDelete(savedProfile._id);
                        resolve();
                    }
                    console.error('Error adding admin', err);
                    reject(err); // Reject the promise with the error
                });
        } else {
            resolve();
        }
    });
}

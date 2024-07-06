// createAdmin.js
const mongoose = require('mongoose');
const User = require('../models/user');
const Profile = require('../models/profile');
const Role = require('../models/role');
const { encryptPassword } = require('../middleware/password');
const moment = require('moment/moment');
require('dotenv').config();

mongoose.connect(`mongodb://localhost:27017/${process.env.APP_NAME}`);


const adminPayload = {
    email: `admin.${process.env.APP_NAME}@gmail.com`,
    phone: "9876543210",
    password: "Admin@123",
    profile: {
        firstname: "admin",
        lastname: `${process.env.APP_NAME}`,
        gender: "other",
        date_of_birth: moment(new Date()).year(1985).month(10).date(11)
    },
}

const superAdminPayload = {
    email: `super-admin.${process.env.APP_NAME}@gmail.com`,
    phone: "9876543200",
    password: "Admin@123",
    profile: {
        firstname: "super admin",
        lastname: `${process.env.APP_NAME}`,
        gender: "other",
        date_of_birth: moment(new Date()).year(1980).month(1).date(17)
    },
}

const userPayload = {
    email: `sam.${process.env.APP_NAME}@gmail.com`,
    phone: "9878453211",
    password: "Pass@123",
    profile: {
        firstname: "Sam",
        lastname: "Whitwicky",
        gender: "male",
        date_of_birth: moment(new Date()).year(1995).month(3).date(20)
    },
}

exports.createSuperAdmin = () => {
    return new Promise(async (resolve, reject) => {
        const user = await User.findOne({ email: superAdminPayload.email });
        if (!user) {
            const profile = new Profile(superAdminPayload.profile);
            const savedProfile = await profile.save();
            const hash = await encryptPassword(superAdminPayload.password);
            const superAdminUser = new User();
            superAdminUser.email = superAdminPayload.email;
            superAdminUser.phone = superAdminPayload.phone;
            superAdminUser.password = hash;
            superAdminUser.profile = savedProfile._id;
            superAdminUser.profileType = superAdminPayload.profileType;
            superAdminUser.createdAt = new Date().toISOString();
            const adminRole = await Role.findOne({ key: 'super-admin' })
            superAdminUser.role = adminRole._id;
            try {
                await superAdminUser.save();
                console.log('super admin added successfully');
                resolve();
            } catch (err) {
                await Profile.findByIdAndDelete(savedProfile._id);
                if (err.code === 11000) {
                    resolve();
                } else if (err.code !== 11000) {
                    console.error('Error adding super admin', err);
                    reject(err); // Reject the promise with the error
                }
            }
        } else {
            resolve();
        }
    });
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
            adminUser.profileType = adminPayload.profileType;
            adminUser.createdAt = new Date().toISOString();
            const adminRole = await Role.findOne({ key: 'admin' })
            adminUser.role = adminRole._id;
            try {
                await adminUser.save();
                console.log('admin added successfully');
                resolve();
            } catch (err) {
                await Profile.findByIdAndDelete(savedProfile._id);
                if (err.code === 11000) {
                    resolve();
                } else if (err.code !== 11000) {
                    console.error('Error adding admin', err);
                    reject(err); // Reject the promise with the error
                }
            }
        } else {
            resolve();
        }
    });
}

exports.createUser = () => {
    return new Promise(async (resolve, reject) => {
        const user = await User.findOne({ email: userPayload.email });
        if (!user) {
            const profile = new Profile(userPayload.profile);
            const savedProfile = await profile.save();
            const hash = await encryptPassword(userPayload.password);
            const newUser = new User();
            newUser.email = userPayload.email;
            newUser.phone = userPayload.phone;
            newUser.password = hash;
            newUser.profile = savedProfile._id;
            newUser.profileType = userPayload.profileType;
            newUser.createdAt = new Date().toISOString();
            const userRole = await Role.findOne({ key: 'general-user' })
            newUser.role = userRole._id;
            try {
                await newUser.save();
                console.log('user added successfully');
                resolve();
            } catch (err) {
                await Profile.findByIdAndDelete(savedProfile._id);
                if (err.code === 11000) {
                    resolve();
                } else if (err.code !== 11000) {
                    console.error('Error adding user', err);
                    reject(err); // Reject the promise with the error
                }
            }
        } else {
            resolve();
        }
    });
}
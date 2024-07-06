// addRoles.js
const mongoose = require('mongoose');
const Role = require('../models/role');
const Feature = require('../models/feature');
require('dotenv').config();

mongoose.connect(`mongodb://localhost:27017/${process.env.APP_NAME}`);

// Array of roles to be inserted
const roles = [
    { name: 'super admin', key: 'super-admin', features: ["all"], description: "Admin role with access to all features" },
    { name: 'admin', key: 'admin', features: [], description: "Admin role with access to most features" },
    { name: 'shop owner', key: 'shop-owner', features: [], description: "Shop owner role with access to shop related features" },
    { name: 'product owner', key: 'product-owner', features: [], description: "Product owner role with access to product related features" },
    { name: 'agent', key: 'agent', features: [], description: "agent role with agent related access" },
    { name: 'general user', key: 'general-user', features: [], description: "user role with limited access" },
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

exports.addPermissions = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const superAdminFeatures = await Feature.find();
            const superAdminPermissions = superAdminFeatures.map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    key: item.key,
                    description: item.description,
                    read: true,
                    create: item.key !== 'transaction',
                    update: item.key !== 'transaction',
                    delete: item.key !== 'transaction',
                }
            })
            await Role.findOneAndUpdate({ key: 'super-admin' }, { features: superAdminPermissions });
            // -------------------------------------------------------------------------------------------------------------
            const adminFeatures = await Feature.find({
                $or: [
                    { key: 'user' },
                    { key: 'product' },
                    { key: 'agent' },
                    { key: 'quotation' },
                    { key: 'bill' },
                    { key: 'transaction' }
                ]
            });
            const adminPermissions = adminFeatures.map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    key: item.key,
                    description: item.description,
                    read: true,
                    create: item.key !== 'transaction',
                    update: item.key !== 'transaction',
                    delete: item.key !== 'transaction',
                }
            })
            await Role.findOneAndUpdate({ key: 'admin' }, { features: adminPermissions });
            // -------------------------------------------------------------------------------------------------------------
            const shopOwnerFeatures = await Feature.find({
                $or: [
                    { key: 'product' },
                    { key: 'agent' },
                    { key: 'quotation' },
                    { key: 'bill' },
                    { key: 'transaction' }
                ]
            });
            const shopOwnerPermissions = shopOwnerFeatures.map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    key: item.key,
                    description: item.description,
                    read: true,
                    create: (['quotation', 'bill', 'agent'].includes(item.key)),
                    update: (['quotation', 'bill', 'agent'].includes(item.key)),
                    delete: false
                }
            })
            await Role.findOneAndUpdate({ key: 'shop-owner' }, { features: shopOwnerPermissions });
            // -------------------------------------------------------------------------------------------------------------
            const productOwnerFeatures = await Feature.find({
                $or: [
                    { key: 'product' },
                    { key: 'agent' },
                    { key: 'quotation' },
                    { key: 'bill' },
                    { key: 'transaction' }
                ]
            });
            const productOwnerPermissions = productOwnerFeatures.map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    key: item.key,
                    description: item.description,
                    read: true,
                    create: (['product', 'agent', 'quotation', 'bill'].includes(item.key)),
                    update: (['product', 'agent', 'quotation', 'bill'].includes(item.key)),
                    delete: false
                }
            })
            await Role.findOneAndUpdate({ key: 'product-owner' }, { features: productOwnerPermissions });
            // -------------------------------------------------------------------------------------------------------------
            const agentFeatures = await Feature.find({
                $or: [
                    { key: 'product' },
                    { key: 'quotation' },
                    { key: 'bill' },
                    { key: 'transaction' }
                ]
            });
            const agentPermissions = agentFeatures.map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    key: item.key,
                    description: item.description,
                    read: true,
                    create: false,
                    update: false,
                    delete: false
                }
            })
            await Role.findOneAndUpdate({ key: 'agent' }, { features: agentPermissions });
            // -------------------------------------------------------------------------------------------------------------
            const generalUserFeatures = await Feature.find({
                $or: [
                    { key: 'product' },
                    { key: 'quotation' },
                    { key: 'bill' },
                    { key: 'transaction' },
                ]
            });
            const generalUserPermissions = generalUserFeatures.map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    key: item.key,
                    description: item.description,
                    read: true,
                    create: false,
                    update: false,
                    delete: false
                }
            })
            await Role.findOneAndUpdate({ key: 'general-user' }, { features: generalUserPermissions });
            console.log('Permissions added successfully');
            resolve();
        } catch (err) {
            console.error('Error adding permissions', err);
            reject(err);
        }
    });
}

const mongoose = require('mongoose');
const { roleSchema } = require('../validations/role');
const Role = mongoose.model('Role');

exports.getRoles = async (req, res, next) => {
    try {
        let roles = await Role.find(req.query);
        res.status(200).send(roles);
    } catch (error) {
        return res.status(400).send(error);
    }
}

exports.getRoleById = async (req, res, next) => {
    try {
        const role = await Role.findById(req.params.id);
        res.status(200).send(role);
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.updateRole = async (req, res, next) => {
    try {
        let { error } = userUpdate.validate(req.body);
        if (error) {
            console.error(error);
            return res.status(400).json(error);
        }
        const user = await User.findById(req.session.user_id).select('-password').populate('profile');
        const profileId = user.profile._id;
        await Profile.findByIdAndUpdate(profileId, req.body.profile, { new: true });
        updatedUser = await User.findById(req.session.user_id).select('-password').populate('profile');
        res.status(200).send(updatedUser);
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.createRole = async (req, res, next) => {
    console.log('hereree')
    let { error } = roleSchema.validate(req.body);
    if (error) {
        console.error(error);
        return res.status(400).json(error);
    }
    try {
        const role = new Role(req.body);
        const savedRole = await role.save();
        res.status(200).send(savedRole);
    } catch (error) {
        return res.send(error);
    }

}
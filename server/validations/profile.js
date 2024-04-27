const Joi = require('joi');

exports.profileSchema = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    gender: Joi.string().valid('male', 'female', 'other').required(),
    date_of_birth: Joi.date(),
});
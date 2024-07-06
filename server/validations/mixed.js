const Joi = require('joi');
const { ObjectId } = require('mongodb');

exports.mixedSchema = Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/).custom((value, helpers) => {
    if (!ObjectId.isValid(value)) {
        return helpers.error('any.invalid');
    }
    return value;
}));

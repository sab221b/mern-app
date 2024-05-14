const Joi = require('joi');

const featuresSchema = Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/).custom((value, helpers) => {
    if (!ObjectId.isValid(value)) {
        return helpers.error('any.invalid');
    }
    return value;
}));

module.exports = {
    roleSchema: Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string(),
        features: featuresSchema,
    })
}
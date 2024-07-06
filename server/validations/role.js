const Joi = require('joi');
const { mixedSchema } = require('./mixed');

module.exports = {
    roleSchema: Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string(),
        features: mixedSchema,
    })
}
const Joi = require('joi');

module.exports = {
    featureSchema: Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string(),
    })
}
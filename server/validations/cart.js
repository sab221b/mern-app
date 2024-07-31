const Joi = require('joi');

module.exports = {
    cartSchema: Joi.object().keys({
        user: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        items: Joi.array().items({
            product: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            quantity: Joi.number().required(),
            unitPrice: Joi.number().required(),
            amount: Joi.number().required(),
        }),
        active: Joi.boolean().required()
    })
}
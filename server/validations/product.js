const Joi = require('joi');
const { mixedSchema } = require('./mixed');

module.exports = {
    productSchema: Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().integer().required(),
        category: mixedSchema,
        brand: Joi.string().required(),
        mfg_date: Joi.date().required(),
        exp_date: Joi.date(),
        attributes: Joi.object(),
        stock_quantity: Joi.number().required(),
        images: Joi.array().items(Joi.string()),
        reviews: Joi.array().items({
            user: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
            rating: Joi.number().integer().min(1).max(5),
            comment: Joi.string()
        })
    })
}
const Joi = require('joi');
const { profileSchema } = require('./profile');

const emailSchema = Joi.string().email().messages({
    'string.email': 'Invalid email address.',
    'any.required': 'Email address is required.',
});
const phoneSchema = Joi.string().pattern(/^\d{10}$/).messages({
    'string.pattern.base': 'Invalid phone number. Must be 10 digits.',
    'any.required': 'Phone number is required.',
});;

const passwordSchema = Joi.string()
.min(8) // Minimum length of 8 characters
.max(30) // Maximum length of 30 characters
.pattern(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
.message('Password must contain at least 8 characters, one letter, one number, and one special character (@$!%*?&)')
.required();

module.exports = {
    userSignup: Joi.object().keys({
        email: emailSchema,
        phone: phoneSchema,
        password: passwordSchema,
        profile: profileSchema,
    }),
    userLogin: Joi.object().keys({
        email: emailSchema,
        phone: phoneSchema,
        password: passwordSchema,
    }).or('email', 'phone'),
    checkUser: Joi.object().keys({
        email: emailSchema,
        phone: phoneSchema,
    }).or('email', 'phone'),
    userUpdate: Joi.object().keys({
        profile: profileSchema,
    }),
}
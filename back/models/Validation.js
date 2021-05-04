const Joi = require('joi');

    const accountSchema = Joi.object({
        email: Joi.string()
        .min(3)
        .max(50)
        .required()
        .email(),
        password: Joi.string()
        .min(10)
        .max(20)
        .alphanum()
        .required()
    });

module.exports = accountSchema;
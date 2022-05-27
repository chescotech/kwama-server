const Joi = require('@hapi/joi');

const registerValidation = (data) => {
    const registerSchema = Joi.object({
        first_name: Joi.string().min(6).required(),
        last_name: Joi.string().min(6).required(),
        nrc: Joi.string().min(6).required(),
        dob: Joi.string().min(6).required(),
        account: Joi.string().min(6).required(),
        phone: Joi.string().min(6).required(),
        photo: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
    });
    return registerSchema.validate(data);
}

const loginValidation = (data) => {
    const loginSchema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
    return loginSchema.validate(data);
}

const postValidation = (data) => {
    const postSchema = Joi.object({
        title: Joi.string().min(10).max(80).required(),
        content: Joi.string().min(50).required(),
        author_id: Joi.string().length(24).hex(),
        tags: Joi.array().max(6).required(),
        categories: Joi.array().max(3)
    });
    return postSchema.validate(data);
}

const userValidation = (data) => {
    const userSchema = Joi.object({
        first_name: Joi.string().min(6).required(),
        last_name: Joi.string().min(6).required(),
        nrc: Joi.string().min(6).required(),
        dob: Joi.string().min(6).required(),
        account: Joi.string().min(6).required(),
        phone: Joi.string().min(6).required(),
        photo: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
    });
    return userSchema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.postValidation = postValidation;
module.exports.userValidation = userValidation;
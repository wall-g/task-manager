import Joi from 'joi';

export const todoSchema = Joi.object({
    _id: Joi.string(),
    title: Joi.string().min(1).max(100).required(),
    description: Joi.string().allow('').max(500),
    userId: Joi.string().required(),
    type: Joi.string().required(),
    createdOn: Joi.string().required(),
    __v: Joi.number()
});

export const userValidationSchema = Joi.object({
    email: Joi.string().email().required(),
    username: Joi.string().max(30).required(),
    password: Joi.string().min(8).required()
});
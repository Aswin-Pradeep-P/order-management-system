import joi from 'joi';

export const CreateUserSchema = joi.object({
 name: joi.string().required(),
 email: joi.string().email().required(),
 password: joi.string().min(8).max(64).required(),
 address: joi.string().min(5).max(100).required()
})
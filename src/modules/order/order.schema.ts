import Joi from "joi";

export const CreateOrderSchema = Joi.object({
  orderItems: Joi.array().items(Joi.object({
    productId: Joi.string().uuid().required(),
    quantity: Joi.number().min(1).required()
  })).required()
}).required()
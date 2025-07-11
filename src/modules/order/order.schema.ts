import Joi from "joi";
import { OrderStatus } from "./order.types";

export const CreateOrderSchema = Joi.object({
  orderItems: Joi.array().items(Joi.object({
    productId: Joi.string().uuid().required(),
    quantity: Joi.number().min(1).required()
  })).required()
}).required()

export const UpdateOrderSchema = Joi.object({
  orderItems: Joi.array().items(Joi.object({
    productId: Joi.string().uuid().required(),
    quantity: Joi.number().min(1).required()
  })),
  status: Joi.string().valid(...Object.values(OrderStatus))
}).required()
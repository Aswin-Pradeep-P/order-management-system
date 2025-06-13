import Joi from "joi";

export const productFilterSchema = Joi.object({
  category: Joi.string().optional(),
  minPrice: Joi.number().min(0).optional(),
  maxPrice: Joi.number().min(0).optional(),
});
// src/middleware/validate.ts
import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

export const validate = (schema: ObjectSchema, part: 'body' | 'query' | 'params') => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req[part], { abortEarly: false, convert: true });
    if (error) {
      res.status(400).json({
        message: 'Validation error',
        errors: error.details.map((detail) => ({
          path: detail.path.join('.'),
          message: detail.message,
        })),
      });

      return;
    }
    req.body = value; // replace with validated & possibly coerced values
    next();
  };
};

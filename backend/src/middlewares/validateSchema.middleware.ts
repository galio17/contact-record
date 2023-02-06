import { RequestHandler } from "express";
import { AnySchema, ValidationError } from "yup";
import AppError from "../errors";

export const validateSchemaMiddleware = (schema: AnySchema): RequestHandler => {
  return async (req, _res, next) => {
    try {
      const validatedData = await schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      req.validatedBody = validatedData;

      return next();
    } catch (error) {
      if (error instanceof ValidationError) {
        const { errors, name } = error;
        throw new AppError(errors, 400, name);
      }

      throw error;
    }
  };
};

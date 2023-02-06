import { ErrorRequestHandler } from "express";

import AppError from "../errors";

export const errorHandlerMiddleware: ErrorRequestHandler = (
  error: any,
  _req,
  res,
  _next
) => {
  if (error instanceof AppError) {
    const { message, name: typeError, statusCode } = error;
    return res.status(statusCode).json({ message, typeError });
  }

  console.error(error);
  return res.status(500).json({ message: "Internal server Error", error });
};

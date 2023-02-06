import { RequestHandler } from "express";
import { verify } from "jsonwebtoken";
import AppError from "../errors";

export const ensureAuthMiddleware: RequestHandler = (req, _res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new AppError("missing authorization", 401);
  }

  const token = authorization.split(" ")[1];

  if (!token) {
    throw new AppError("missing token", 401);
  }

  verify(token, process.env.SECRET_KEY!, (error, decoded) => {
    if (error) {
      const { message, name } = error;
      throw new AppError(message, 401, name);
    }

    if (
      !decoded ||
      typeof decoded !== "object" ||
      typeof decoded.sub !== "string"
    ) {
      throw new AppError("invalid token", 401);
    }

    req.user = {
      id: decoded.sub,
      ownContactId: decoded.ownContactId,
    };
  });

  next();
};

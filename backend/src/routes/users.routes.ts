import { Router } from "express";
import { createUserController } from "../controllers/users";
import { validateSchemaMiddleware } from "../middlewares";
import { createUserSchema } from "../schemas/users";

export const usersRouter = Router();

usersRouter.post(
  "/",
  validateSchemaMiddleware(createUserSchema),
  createUserController
);

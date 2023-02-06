import { Router } from "express";
import { loginController } from "../controllers/sessions";
import { validateSchemaMiddleware } from "../middlewares";
import { loginSchema } from "../schemas/sessions";

export const sessionsRouter = Router();

sessionsRouter.post(
  "/login",
  validateSchemaMiddleware(loginSchema),
  loginController
);

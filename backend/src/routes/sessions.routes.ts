import { Router } from "express";
import { getProfileController, loginController } from "../controllers/sessions";
import { ensureAuthMiddleware, validateSchemaMiddleware } from "../middlewares";
import { loginSchema } from "../schemas/sessions";

export const sessionsRouter = Router();

sessionsRouter.post(
  "/login",
  validateSchemaMiddleware(loginSchema),
  loginController
);
sessionsRouter.get("/profile", ensureAuthMiddleware, getProfileController);

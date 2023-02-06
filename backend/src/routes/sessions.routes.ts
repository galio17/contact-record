import { Router } from "express";
import {
  getProfileController,
  loginController,
  updateProfileController,
} from "../controllers/sessions";
import { ensureAuthMiddleware, validateSchemaMiddleware } from "../middlewares";
import { loginSchema, updateProfileSchema } from "../schemas/sessions";

export const sessionsRouter = Router();

sessionsRouter.post(
  "/login",
  validateSchemaMiddleware(loginSchema),
  loginController
);
sessionsRouter.get("/profile", ensureAuthMiddleware, getProfileController);
sessionsRouter.patch(
  "/profile",
  ensureAuthMiddleware,
  validateSchemaMiddleware(updateProfileSchema),
  updateProfileController
);

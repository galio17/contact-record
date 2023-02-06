import { Router } from "express";
import { createContactController } from "../controllers/contacts";
import { ensureAuthMiddleware, validateSchemaMiddleware } from "../middlewares";
import { createContactSchema } from "../schemas/contacts";

export const contactsRouter = Router();

contactsRouter.post(
  "/",
  ensureAuthMiddleware,
  validateSchemaMiddleware(createContactSchema),
  createContactController
);

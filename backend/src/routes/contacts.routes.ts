import { Router } from "express";
import {
  createContactController,
  getUniqueContactController,
} from "../controllers/contacts";
import { listContactsController } from "../controllers/contacts/listContacts.controller";
import { ensureAuthMiddleware, validateSchemaMiddleware } from "../middlewares";
import { createContactSchema } from "../schemas/contacts";
import { getUniqueContactService } from "../services/contacts";

export const contactsRouter = Router();

contactsRouter.post(
  "/",
  ensureAuthMiddleware,
  validateSchemaMiddleware(createContactSchema),
  createContactController
);

contactsRouter.get("/", ensureAuthMiddleware, listContactsController);

contactsRouter.get("/:id", ensureAuthMiddleware, getUniqueContactController);

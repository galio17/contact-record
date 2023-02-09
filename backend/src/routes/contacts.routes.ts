import { Router } from "express";
import {
  createContactController,
  getUniqueContactController,
  updateContactController,
} from "../controllers/contacts";
import { deleteContactController } from "../controllers/contacts/deleteContact.controller";
import { listContactsController } from "../controllers/contacts/listContacts.controller";
import { ensureAuthMiddleware, validateSchemaMiddleware } from "../middlewares";
import { createContactSchema, updateContactSchema } from "../schemas/contacts";
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

contactsRouter.patch(
  "/:id",
  ensureAuthMiddleware,
  validateSchemaMiddleware(updateContactSchema),
  updateContactController
);

contactsRouter.delete("/:id", ensureAuthMiddleware, deleteContactController);

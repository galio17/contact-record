import { RequestHandler } from "express";
import { createContactService } from "../../services/contacts";

export const createContactController: RequestHandler = async (req, res) => {
  const contact = await createContactService(req.validatedBody, req.user!);

  return res.status(201).json(contact);
};

import { RequestHandler } from "express";
import { updateContactService } from "../../services/contacts";

export const updateContactController: RequestHandler = async (req, res) => {
  const contact = await updateContactService(req.body, req.params.id, req.user);

  return res.status(200).json(contact);
};

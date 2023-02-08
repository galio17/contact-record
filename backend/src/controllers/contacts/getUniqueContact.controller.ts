import { RequestHandler } from "express";
import { getUniqueContactService } from "../../services/contacts";

export const getUniqueContactController: RequestHandler = async (req, res) => {
  const contact = await getUniqueContactService(req.params.id, req.user);

  return res.status(200).json(contact);
};

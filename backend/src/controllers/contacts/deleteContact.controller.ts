import { RequestHandler } from "express";
import { deleteContactService } from "../../services/contacts";

export const deleteContactController: RequestHandler = async (req, res) => {
  await deleteContactService(req.params.id, req.user);

  return res.status(204).json();
};

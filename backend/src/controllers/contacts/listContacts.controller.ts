import { RequestHandler } from "express";
import { listContactsService } from "../../services/contacts";

export const listContactsController: RequestHandler = async (req, res) => {
  const contacts = await listContactsService(req.user!);

  return res.status(200).json(contacts);
};

import { RequestHandler } from "express";
import { deleteProfileService } from "../../services/sessions";

export const deleteProfileController: RequestHandler = async (req, res) => {
  await deleteProfileService(req.user!);

  return res.status(204).json();
};

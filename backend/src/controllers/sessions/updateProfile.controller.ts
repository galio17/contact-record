import { RequestHandler } from "express";
import { updateProfileService } from "../../services/sessions";

export const updateProfileController: RequestHandler = async (req, res) => {
  const user = await updateProfileService(req.validatedBody, req.user!);

  return res.status(200).json(user);
};

import { RequestHandler } from "express";
import { getProfileService } from "../../services/sessions";

export const getProfileController: RequestHandler = async (req, res) => {
  const profile = await getProfileService(req.user!);

  return res.status(200).json(profile);
};

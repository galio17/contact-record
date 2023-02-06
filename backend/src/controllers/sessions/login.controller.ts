import { RequestHandler } from "express";
import { loginService } from "../../services/sessions";

export const loginController: RequestHandler = async (req, res) => {
  const token = await loginService(req.validatedBody);

  return res.status(200).json(token);
};

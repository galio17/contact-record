import { RequestHandler } from "express";
import { createUserService } from "../../services/users";

export const createUserController: RequestHandler = async (req, res) => {
  const user = await createUserService(req.validatedBody);

  return res.status(201).json(user);
};

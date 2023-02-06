import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import AppError from "../../errors";
import { ILogin } from "../../interfaces/sessions";
import { prisma } from "../../prisma";

export const loginService = async ({ email, password }: ILogin) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new AppError("email and password dont matche", 401);
  }

  const isThePassword = await compare(password, user.password);
  if (!isThePassword) {
    throw new AppError("email and password dont matche", 401);
  }

  const token = sign(
    { ownContactId: user.ownContactId },
    process.env.SECRET_KEY!,
    {
      expiresIn: "24h",
      subject: user.id,
    }
  );

  return { token };
};

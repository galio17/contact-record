import { hash } from "bcryptjs";
import AppError from "../../errors";
import { IUserRequest } from "../../interfaces/users";
import { prisma } from "../../prisma";
import { userResponseSchema } from "../../schemas";
import { includeOnContacts, manyConnectionsHandler } from "../../utils";
import { formatValue } from "../../utils";

export const createUserService = async ({
  emails,
  name,
  password,
  phones,
  accessEmail,
}: IUserRequest) => {
  if (!Array.isArray(emails)) {
    accessEmail = emails;
    emails = [emails];
  }

  if (!accessEmail) {
    accessEmail = emails[0];
  }

  const existUser = await prisma.user.findUnique({
    where: { email: accessEmail },
  });

  if (existUser) {
    throw new AppError("Email already registered", 409);
  }

  if (!Array.isArray(phones)) {
    phones = [phones];
  }

  const emailContacts = emails.map(manyConnectionsHandler);
  const phoneContacts = phones.map(manyConnectionsHandler);

  const user = await prisma.user.create({
    data: {
      email: accessEmail,
      password: await hash(password, 10),
      ownContact: {
        create: {
          name,
          emails: {
            create: emailContacts,
          },
          phones: {
            create: phoneContacts,
          },
        },
      },
    },
    include: {
      ownContact: includeOnContacts,
    },
  });

  return formatValue(user, userResponseSchema, "ownContact");
};

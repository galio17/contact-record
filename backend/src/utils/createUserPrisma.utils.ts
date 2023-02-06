import { hashSync } from "bcryptjs";
import { IUserRequest } from "../interfaces/users";
import { prisma } from "../prisma";
import { manyConnectionsHandler } from "./manyConnectionsHandler.utils";

export const createUserPrisma = async ({
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

  const emailContacts = emails.map(manyConnectionsHandler);

  if (!Array.isArray(phones)) {
    phones = [phones];
  }
  const phoneContacts = phones.map(manyConnectionsHandler);

  return await prisma.user.create({
    data: {
      email: accessEmail!,
      password: hashSync(password),
      ownContact: {
        create: {
          name: name,
          emails: {
            create: emailContacts,
          },
          phones: {
            create: phoneContacts,
          },
        },
      },
    },
  });
};

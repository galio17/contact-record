import { Prisma } from "@prisma/client";
import { hash } from "bcryptjs";
import { IReqUser } from "../../interfaces/others";
import { IUserUpdate } from "../../interfaces/sessions";
import { prisma } from "../../prisma";
import { userResponseSchema } from "../../schemas";
import {
  formatValue,
  includeOnContacts,
  manyConnectionsHandler,
} from "../../utils";

export const updateProfileService = async (
  { name, emails, accessEmail: email, password, phones }: IUserUpdate,
  { id }: IReqUser
) => {
  let updateEmails: Prisma.EmailUpdateManyWithoutContactNestedInput = {};
  let updatePhones: Prisma.PhoneUpdateManyWithoutContactNestedInput = {};

  if (password) {
    password = await hash(password, 10);
  }

  if (typeof emails === "string") {
    email = emails;
    emails = [emails];
  }

  if (email && !emails) {
    const existEmail = await prisma.email.findFirst({
      where: { connection: { contact: email } },
      include: { connection: true },
    });

    if (!existEmail) {
      updateEmails = {
        create: {
          connection: {
            connectOrCreate: {
              where: { contact: email },
              create: { contact: email },
            },
          },
        },
      };
    }
  }

  if (emails) {
    updateEmails = {
      deleteMany: {},
      create: emails.map(manyConnectionsHandler),
    };
  }

  if (typeof phones === "string") {
    phones = [phones];
  }

  if (phones?.length) {
    updatePhones = {
      deleteMany: {},
      create: phones.map(manyConnectionsHandler),
    };
  }

  const updatedUser = await prisma.user.update({
    where: {
      id,
    },
    data: {
      email,
      password,
      ownContact: {
        update: {
          name,
          emails: updateEmails,
          phones: updatePhones,
        },
      },
    },
    include: {
      ownContact: includeOnContacts,
    },
  });

  return formatValue(updatedUser, userResponseSchema, "ownContact");
};

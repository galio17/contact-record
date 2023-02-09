import { Prisma } from "@prisma/client";
import { IReqUser } from "../../interfaces/others";
import { prisma } from "../../prisma";
import { contactResponseSchema } from "../../schemas";
import { formatValue } from "../../utils";

export const listContactsService = async ({ id: userId }: IReqUser) => {
  const includeConnection:
    | Prisma.Contact$emailsArgs
    | Prisma.Contact$phonesArgs = { include: { connection: true } };
  const contacts = await prisma.contact.findMany({
    where: { userId },
    include: { emails: includeConnection, phones: includeConnection },
  });

  return contacts.map((contact) => formatValue(contact, contactResponseSchema));
};

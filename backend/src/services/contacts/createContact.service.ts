import { IContactRequest } from "../../interfaces/contacts";
import { IReqUser } from "../../interfaces/others";
import { prisma } from "../../prisma";
import { contactResponseSchema } from "../../schemas";
import { formatValue, manyConnectionsHandler } from "../../utils";

export const createContactService = async (
  { name, emails, phones }: IContactRequest,
  { id }: IReqUser
) => {
  if (typeof emails === "string") {
    emails = [emails];
  }

  if (typeof phones === "string") {
    phones = [phones];
  }

  const contact = await prisma.contact.create({
    data: {
      name,
      emails: {
        create: emails.map(manyConnectionsHandler),
      },
      phones: {
        create: phones.map(manyConnectionsHandler),
      },
      user: { connect: { id } },
    },
    include: {
      emails: { include: { connection: true } },
      phones: { include: { connection: true } },
    },
  });

  return formatValue(contact, contactResponseSchema);
};

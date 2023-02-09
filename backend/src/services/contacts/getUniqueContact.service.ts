import AppError from "../../errors";
import { IReqUser } from "../../interfaces/others";
import { prisma } from "../../prisma";
import { contactResponseSchema } from "../../schemas";
import { formatValue, includeOnContacts } from "../../utils";

export const getUniqueContactService = async (
  id: string,
  { id: userId }: IReqUser
) => {
  const contact = await prisma.contact.findFirst({
    ...includeOnContacts,
    where: { id, userId },
  });

  if (!contact) {
    throw new AppError("contact not found", 404);
  }

  return formatValue(contact, contactResponseSchema);
};

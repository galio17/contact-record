import { Prisma } from "@prisma/client";
import AppError from "../../errors";
import { IContactUpdate } from "../../interfaces/contacts";
import { IReqUser } from "../../interfaces/others";
import { prisma } from "../../prisma";
import { contactResponseSchema } from "../../schemas";
import {
  formatValue,
  includeOnContacts,
  manyConnectionsHandler,
} from "../../utils";

export const updateContactService = async (
  { name, ...connections }: IContactUpdate,
  id: string,
  { id: userId }: IReqUser
) => {
  const updatedContact = await prisma.$transaction(async () => {
    const contact = await prisma.contact.findFirst({ where: { id, userId } });
    if (!contact) {
      throw new AppError("user not found", 404);
    }

    const updateConnections: Prisma.ContactUpdateInput = {};

    Object.entries(connections).forEach(async ([key, value]) => {
      const keyOfConnections = key as keyof Pick<
        Prisma.ContactUpdateInput,
        "emails" | "phones"
      >;

      const test:
        | Prisma.EmailUpdateManyWithoutContactNestedInput
        | Prisma.PhoneUpdateManyWithoutContactNestedInput = {};

      if (typeof value === "string") {
        value = [value];
      }

      if (value) {
        const emailConnections = await prisma.$transaction(
          value.map((contact) => {
            return prisma.connection.upsert({
              where: { contact },
              update: {},
              create: { contact },
            });
          })
        );

        test.deleteMany = {};
        test.createMany = {
          data: emailConnections.map(({ id }) => ({ connectionId: id })),
          skipDuplicates: true,
        };
        updateConnections[keyOfConnections] = test;
      }
    });

    const updatedContact = await prisma.contact.update({
      ...includeOnContacts,
      where: { id },
      data: {
        ...updateConnections,
        name,
      },
    });

    return updatedContact;
  });

  return formatValue(updatedContact, contactResponseSchema);
};

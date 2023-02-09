import { Prisma } from "@prisma/client";
import AppError from "../../errors";
import { IContactUpdate } from "../../interfaces/contacts";
import { IReqUser } from "../../interfaces/others";
import { prisma } from "../../prisma";
import { contactResponseSchema } from "../../schemas";
import { formatValue, includeOnContacts } from "../../utils";

export const updateContactService = async (
  { name, ...connections }: IContactUpdate,
  id: string,
  { id: userId }: IReqUser
) => {
  const updatedContact = await prisma.$transaction(async () => {
    const contact = await prisma.contact.findFirst({ where: { id, userId } });
    if (!contact) {
      throw new AppError("contact not found", 404);
    }

    const updateConnectionList = await Promise.all(
      Object.entries(connections).map(async ([key, value]) => {
        const updateConnection:
          | Prisma.EmailUpdateManyWithoutContactNestedInput
          | Prisma.PhoneUpdateManyWithoutContactNestedInput = {};

        if (!value) {
          return;
        }

        if (typeof value === "string") {
          value = [value];
        }

        const connections = await prisma.$transaction(
          value.map((contact) => {
            return prisma.connection.upsert({
              where: { contact },
              update: {},
              create: { contact },
            });
          })
        );

        updateConnection.deleteMany = {};
        updateConnection.createMany = {
          data: connections.map(({ id }) => ({ connectionId: id })),
          skipDuplicates: true,
        };

        const currentUpdate: Prisma.ContactUpdateInput = {};
        const keyOfConnections = key as keyof Pick<
          Prisma.ContactUpdateInput,
          "emails" | "phones"
        >;
        currentUpdate[keyOfConnections] = updateConnection;
        return currentUpdate;
      })
    );

    const updateConnections = {};
    if (updateConnectionList.length) {
      Object.assign(updateConnections, ...updateConnectionList);
    }

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

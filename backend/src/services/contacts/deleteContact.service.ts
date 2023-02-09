import AppError from "../../errors";
import { IReqUser } from "../../interfaces/others";
import { prisma } from "../../prisma";

export const deleteContactService = async (
  id: string,
  { id: userId }: IReqUser
) => {
  await prisma.$transaction(async () => {
    const contact = await prisma.contact.findFirst({ where: { id, userId } });

    if (!contact) {
      throw new AppError("contact not found", 404);
    }

    await prisma.contact.delete({
      where: { id },
    });
  });
};

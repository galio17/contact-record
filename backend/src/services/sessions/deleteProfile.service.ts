import { IReqUser } from "../../interfaces/others";
import { prisma } from "../../prisma";

export const deleteProfileService = async ({ id }: IReqUser) => {
  await prisma.user.delete({
    where: {
      id,
    },
  });
};

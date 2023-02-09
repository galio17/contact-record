import { Prisma } from "@prisma/client";
import { IReqUser } from "../../interfaces/others";
import { prisma } from "../../prisma";
import { userResponseSchema } from "../../schemas";
import { formatValue, includeOnContacts } from "../../utils";

export const getProfileService = async ({ id }: IReqUser) => {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      ownContact: includeOnContacts,
    },
  });

  return formatValue(user, userResponseSchema, "ownContact");
};

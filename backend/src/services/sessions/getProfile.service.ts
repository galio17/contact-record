import { Prisma } from "@prisma/client";
import { prisma } from "../../prisma";
import { userResponseSchema } from "../../schemas";
import { formatValue } from "../../utils";

export const getProfileService = async (id: string) => {
  const includeConnection: Prisma.EmailArgs | Prisma.PhoneArgs = {
    include: {
      connection: true,
    },
  };

  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      ownContact: {
        include: {
          emails: includeConnection,
          phones: includeConnection,
        },
      },
    },
  });

  return formatValue(user, userResponseSchema, "ownContact");
};

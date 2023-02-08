import { Prisma } from "@prisma/client";

const includeConnections:
  | Prisma.Connection$emailsArgs
  | Prisma.Contact$phonesArgs = { include: { connection: true } };
export const includeOnContacts: Prisma.ContactArgs = {
  include: { emails: includeConnections, phones: includeConnections },
};

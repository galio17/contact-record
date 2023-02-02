import { PrismaClient } from "@prisma/client";
import { execSync } from "child_process";
import { randomUUID } from "crypto";
import { join } from "path";

const generateDatabaseUrl = (schema: string) => {
  if (!process.env.DATABASE_URL) {
    throw new Error("Database url not provided");
  }

  const url = new URL(process.env.DATABASE_URL);
  url.searchParams.append("schema", schema);

  return url.toString();
};

const schemaId = "test-" + randomUUID();
const prismaBinary = join(
  __dirname,
  "..",
  "..",
  "..",
  "node_modules",
  ".bin",
  "prisma"
);

const url = generateDatabaseUrl(schemaId);
process.env.DATABASE_URL = url;

export const prisma = new PrismaClient({
  datasources: { db: { url } },
});

beforeAll(() => {
  execSync(`${prismaBinary} db push --skip-generate`, {
    env: {
      ...process.env,
      DATABASE_URL: generateDatabaseUrl(schemaId),
    },
  });
});

afterAll(async () => {
  await prisma.$executeRawUnsafe(
    `DROP SCHEMA IF EXISTS "${schemaId}" CASCADE;`
  );
  await prisma.$disconnect();
});

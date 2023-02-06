/*
  Warnings:

  - You are about to drop the column `clientId` on the `contacts` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "contacts" DROP CONSTRAINT "contacts_clientId_fkey";

-- AlterTable
ALTER TABLE "contacts" DROP COLUMN "clientId",
ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

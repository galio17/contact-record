/*
  Warnings:

  - You are about to drop the column `created_at` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `contacts` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `contacts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "contacts" DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

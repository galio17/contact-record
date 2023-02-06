-- DropForeignKey
ALTER TABLE "emails" DROP CONSTRAINT "emails_contactId_fkey";

-- DropForeignKey
ALTER TABLE "phones" DROP CONSTRAINT "phones_contactId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_ownContactId_fkey";

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_ownContactId_fkey" FOREIGN KEY ("ownContactId") REFERENCES "contacts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "emails" ADD CONSTRAINT "emails_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "contacts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "phones" ADD CONSTRAINT "phones_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "contacts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

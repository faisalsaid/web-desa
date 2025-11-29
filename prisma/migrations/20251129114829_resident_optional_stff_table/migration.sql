-- DropForeignKey
ALTER TABLE "Staff" DROP CONSTRAINT "Staff_residentId_fkey";

-- AlterTable
ALTER TABLE "Staff" ALTER COLUMN "residentId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_residentId_fkey" FOREIGN KEY ("residentId") REFERENCES "Resident"("id") ON DELETE SET NULL ON UPDATE CASCADE;

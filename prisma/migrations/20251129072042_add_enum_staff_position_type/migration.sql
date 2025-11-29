/*
  Warnings:

  - Added the required column `name` to the `Staff` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StaffPositionType" AS ENUM ('TOP', 'MIDDLE', 'LOWER', 'STAFF', 'OTHER');

-- AlterTable
ALTER TABLE "Staff" ADD COLUMN     "imageUrl" VARCHAR(255),
ADD COLUMN     "name" VARCHAR(100) NOT NULL,
ADD COLUMN     "parentStaffId" INTEGER;

-- AlterTable
ALTER TABLE "StaffPosition" ADD COLUMN     "positionType" "StaffPositionType" NOT NULL DEFAULT 'OTHER';

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_parentStaffId_fkey" FOREIGN KEY ("parentStaffId") REFERENCES "Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;

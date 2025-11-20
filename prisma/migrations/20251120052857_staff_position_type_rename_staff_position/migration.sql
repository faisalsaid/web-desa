/*
  Warnings:

  - You are about to drop the `StaffPositionType` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "OrganizationUnit" DROP CONSTRAINT "OrganizationUnit_positionTypeId_fkey";

-- DropForeignKey
ALTER TABLE "Staff" DROP CONSTRAINT "Staff_positionTypeId_fkey";

-- DropForeignKey
ALTER TABLE "StaffHistory" DROP CONSTRAINT "StaffHistory_positionTypeId_fkey";

-- DropTable
DROP TABLE "StaffPositionType";

-- CreateTable
CREATE TABLE "StaffPosition" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StaffPosition_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StaffPosition_slug_key" ON "StaffPosition"("slug");

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_positionTypeId_fkey" FOREIGN KEY ("positionTypeId") REFERENCES "StaffPosition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StaffHistory" ADD CONSTRAINT "StaffHistory_positionTypeId_fkey" FOREIGN KEY ("positionTypeId") REFERENCES "StaffPosition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationUnit" ADD CONSTRAINT "OrganizationUnit_positionTypeId_fkey" FOREIGN KEY ("positionTypeId") REFERENCES "StaffPosition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

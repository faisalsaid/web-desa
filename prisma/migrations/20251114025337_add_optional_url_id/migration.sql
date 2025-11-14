/*
  Warnings:

  - A unique constraint covering the columns `[urlId]` on the table `Family` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[urlId]` on the table `Resident` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[urlId]` on the table `Visitor` will be added. If there are existing duplicate values, this will fail.
  - The required column `urlId` was added to the `Family` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `urlId` was added to the `Visitor` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Family" ADD COLUMN     "urlId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Resident" ADD COLUMN     "urlId" TEXT;

-- AlterTable
ALTER TABLE "Visitor" ADD COLUMN     "urlId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Family_urlId_key" ON "Family"("urlId");

-- CreateIndex
CREATE INDEX "Family_dusun_rw_rt_idx" ON "Family"("dusun", "rw", "rt");

-- CreateIndex
CREATE UNIQUE INDEX "Resident_urlId_key" ON "Resident"("urlId");

-- CreateIndex
CREATE INDEX "Resident_familyId_idx" ON "Resident"("familyId");

-- CreateIndex
CREATE INDEX "Resident_dusun_rw_rt_idx" ON "Resident"("dusun", "rw", "rt");

-- CreateIndex
CREATE INDEX "Resident_populationStatus_idx" ON "Resident"("populationStatus");

-- CreateIndex
CREATE INDEX "Resident_isActive_idx" ON "Resident"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "Visitor_urlId_key" ON "Visitor"("urlId");

-- CreateIndex
CREATE INDEX "Visitor_arrivalDate_idx" ON "Visitor"("arrivalDate");

-- CreateIndex
CREATE INDEX "Visitor_departureDate_idx" ON "Visitor"("departureDate");

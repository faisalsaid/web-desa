/*
  Warnings:

  - A unique constraint covering the columns `[urlId]` on the table `Staff` will be added. If there are existing duplicate values, this will fail.
  - The required column `urlId` was added to the `Staff` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Staff" ADD COLUMN     "urlId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Staff_urlId_key" ON "Staff"("urlId");

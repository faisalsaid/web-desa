/*
  Warnings:

  - A unique constraint covering the columns `[urlId]` on the table `Staff` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Staff" ADD COLUMN     "urlId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Staff_urlId_key" ON "Staff"("urlId");

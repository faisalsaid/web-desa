/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `StaffPositionType` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `StaffPositionType` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "StaffPositionType_name_key";

-- AlterTable
ALTER TABLE "StaffPositionType" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "StaffPositionType_slug_key" ON "StaffPositionType"("slug");

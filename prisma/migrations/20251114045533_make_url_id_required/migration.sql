/*
  Warnings:

  - Made the column `urlId` on table `Resident` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Resident" ALTER COLUMN "urlId" SET NOT NULL;

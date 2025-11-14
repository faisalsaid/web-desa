/*
  Warnings:

  - Made the column `address` on table `Family` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dusun` on table `Family` required. This step will fail if there are existing NULL values in that column.
  - Made the column `rw` on table `Family` required. This step will fail if there are existing NULL values in that column.
  - Made the column `rt` on table `Family` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Family" ALTER COLUMN "address" SET NOT NULL,
ALTER COLUMN "dusun" SET NOT NULL,
ALTER COLUMN "rw" SET NOT NULL,
ALTER COLUMN "rt" SET NOT NULL;

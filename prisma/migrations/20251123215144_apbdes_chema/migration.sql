/*
  Warnings:

  - You are about to drop the column `createdById` on the `BudgetYear` table. All the data in the column will be lost.
  - You are about to drop the column `isFinalized` on the `BudgetYear` table. All the data in the column will be lost.
  - You are about to drop the column `isLocked` on the `BudgetYear` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `BudgetYear` table. All the data in the column will be lost.
  - You are about to drop the column `updatedById` on the `BudgetYear` table. All the data in the column will be lost.
  - You are about to drop the `AuditLog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BudgetActivity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BudgetAllocation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BudgetCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BudgetRealization` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FinancialTransaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FundingSource` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TransactionAttachment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VillageBankAccount` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "RevenueCategory" AS ENUM ('OWN_SOURCE', 'TRANSFER', 'OTHER');

-- CreateEnum
CREATE TYPE "ExpenseSector" AS ENUM ('GOVERNMENT_ADMIN', 'DEVELOPMENT', 'COMMUNITY_GUIDANCE', 'EMPOWERMENT', 'EMERGENCY');

-- CreateEnum
CREATE TYPE "FinancingType" AS ENUM ('RECEIPT', 'EXPENDITURE');

-- DropForeignKey
ALTER TABLE "BudgetActivity" DROP CONSTRAINT "BudgetActivity_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "BudgetAllocation" DROP CONSTRAINT "BudgetAllocation_activityId_fkey";

-- DropForeignKey
ALTER TABLE "BudgetAllocation" DROP CONSTRAINT "BudgetAllocation_fundingSourceId_fkey";

-- DropForeignKey
ALTER TABLE "BudgetCategory" DROP CONSTRAINT "BudgetCategory_yearId_fkey";

-- DropForeignKey
ALTER TABLE "BudgetRealization" DROP CONSTRAINT "BudgetRealization_allocationId_fkey";

-- DropForeignKey
ALTER TABLE "FinancialTransaction" DROP CONSTRAINT "FinancialTransaction_accountId_fkey";

-- DropForeignKey
ALTER TABLE "FinancialTransaction" DROP CONSTRAINT "FinancialTransaction_realizationId_fkey";

-- DropForeignKey
ALTER TABLE "TransactionAttachment" DROP CONSTRAINT "TransactionAttachment_transactionId_fkey";

-- AlterTable
ALTER TABLE "BudgetYear" DROP COLUMN "createdById",
DROP COLUMN "isFinalized",
DROP COLUMN "isLocked",
DROP COLUMN "title",
DROP COLUMN "updatedById",
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "AuditLog";

-- DropTable
DROP TABLE "BudgetActivity";

-- DropTable
DROP TABLE "BudgetAllocation";

-- DropTable
DROP TABLE "BudgetCategory";

-- DropTable
DROP TABLE "BudgetRealization";

-- DropTable
DROP TABLE "FinancialTransaction";

-- DropTable
DROP TABLE "FundingSource";

-- DropTable
DROP TABLE "TransactionAttachment";

-- DropTable
DROP TABLE "VillageBankAccount";

-- DropEnum
DROP TYPE "TransactionType";

-- CreateTable
CREATE TABLE "Revenue" (
    "id" SERIAL NOT NULL,
    "urlId" TEXT NOT NULL,
    "yearId" INTEGER NOT NULL,
    "category" "RevenueCategory" NOT NULL,
    "description" TEXT NOT NULL,
    "budget" INTEGER NOT NULL,
    "realized" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Revenue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expense" (
    "id" SERIAL NOT NULL,
    "urlId" TEXT NOT NULL,
    "yearId" INTEGER NOT NULL,
    "sector" "ExpenseSector" NOT NULL,
    "description" TEXT NOT NULL,
    "budget" INTEGER NOT NULL,
    "realized" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Financing" (
    "id" SERIAL NOT NULL,
    "urlId" TEXT NOT NULL,
    "yearId" INTEGER NOT NULL,
    "type" "FinancingType" NOT NULL,
    "description" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Financing_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Revenue_urlId_key" ON "Revenue"("urlId");

-- CreateIndex
CREATE UNIQUE INDEX "Expense_urlId_key" ON "Expense"("urlId");

-- CreateIndex
CREATE UNIQUE INDEX "Financing_urlId_key" ON "Financing"("urlId");

-- AddForeignKey
ALTER TABLE "Revenue" ADD CONSTRAINT "Revenue_yearId_fkey" FOREIGN KEY ("yearId") REFERENCES "BudgetYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_yearId_fkey" FOREIGN KEY ("yearId") REFERENCES "BudgetYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Financing" ADD CONSTRAINT "Financing_yearId_fkey" FOREIGN KEY ("yearId") REFERENCES "BudgetYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('DEBIT', 'CREDIT');

-- CreateTable
CREATE TABLE "BudgetYear" (
    "id" SERIAL NOT NULL,
    "year" INTEGER NOT NULL,
    "title" TEXT,
    "isLocked" BOOLEAN NOT NULL DEFAULT false,
    "isFinalized" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdById" INTEGER,
    "updatedById" INTEGER,

    CONSTRAINT "BudgetYear_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BudgetCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "yearId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdById" INTEGER,
    "updatedById" INTEGER,

    CONSTRAINT "BudgetCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BudgetActivity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isLocked" BOOLEAN NOT NULL DEFAULT false,
    "categoryId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdById" INTEGER,
    "updatedById" INTEGER,

    CONSTRAINT "BudgetActivity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BudgetAllocation" (
    "id" SERIAL NOT NULL,
    "amount" DECIMAL(20,2) NOT NULL DEFAULT 0,
    "notes" TEXT,
    "isLocked" BOOLEAN NOT NULL DEFAULT false,
    "activityId" INTEGER NOT NULL,
    "fundingSourceId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdById" INTEGER,
    "updatedById" INTEGER,

    CONSTRAINT "BudgetAllocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BudgetRealization" (
    "id" SERIAL NOT NULL,
    "amount" DECIMAL(20,2) NOT NULL DEFAULT 0,
    "date" TIMESTAMP(3),
    "notes" TEXT,
    "allocationId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdById" INTEGER,
    "updatedById" INTEGER,

    CONSTRAINT "BudgetRealization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FundingSource" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdById" INTEGER,
    "updatedById" INTEGER,

    CONSTRAINT "FundingSource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VillageBankAccount" (
    "id" SERIAL NOT NULL,
    "bankName" TEXT NOT NULL,
    "accountNumber" TEXT NOT NULL,
    "ownerName" TEXT NOT NULL,
    "openingBalance" DECIMAL(20,2) NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdById" INTEGER,
    "updatedById" INTEGER,

    CONSTRAINT "VillageBankAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FinancialTransaction" (
    "id" SERIAL NOT NULL,
    "transactionNumber" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "amount" DECIMAL(20,2) NOT NULL,
    "type" "TransactionType" NOT NULL,
    "notes" TEXT,
    "balanceAfter" DECIMAL(20,2),
    "realizationId" INTEGER NOT NULL,
    "accountId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdById" INTEGER,
    "updatedById" INTEGER,

    CONSTRAINT "FinancialTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransactionAttachment" (
    "id" SERIAL NOT NULL,
    "transactionId" INTEGER NOT NULL,
    "path" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "contentType" TEXT,
    "size" INTEGER,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "uploadedById" INTEGER,

    CONSTRAINT "TransactionAttachment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" SERIAL NOT NULL,
    "actorId" INTEGER,
    "action" TEXT NOT NULL,
    "targetTable" TEXT,
    "targetId" INTEGER,
    "payload" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BudgetYear_year_key" ON "BudgetYear"("year");

-- CreateIndex
CREATE INDEX "BudgetCategory_yearId_idx" ON "BudgetCategory"("yearId");

-- CreateIndex
CREATE INDEX "BudgetActivity_categoryId_idx" ON "BudgetActivity"("categoryId");

-- CreateIndex
CREATE INDEX "BudgetAllocation_activityId_idx" ON "BudgetAllocation"("activityId");

-- CreateIndex
CREATE INDEX "BudgetAllocation_fundingSourceId_idx" ON "BudgetAllocation"("fundingSourceId");

-- CreateIndex
CREATE INDEX "BudgetRealization_allocationId_idx" ON "BudgetRealization"("allocationId");

-- CreateIndex
CREATE INDEX "BudgetRealization_date_idx" ON "BudgetRealization"("date");

-- CreateIndex
CREATE UNIQUE INDEX "FundingSource_code_key" ON "FundingSource"("code");

-- CreateIndex
CREATE UNIQUE INDEX "VillageBankAccount_accountNumber_key" ON "VillageBankAccount"("accountNumber");

-- CreateIndex
CREATE INDEX "VillageBankAccount_accountNumber_idx" ON "VillageBankAccount"("accountNumber");

-- CreateIndex
CREATE UNIQUE INDEX "FinancialTransaction_transactionNumber_key" ON "FinancialTransaction"("transactionNumber");

-- CreateIndex
CREATE INDEX "FinancialTransaction_date_idx" ON "FinancialTransaction"("date");

-- CreateIndex
CREATE INDEX "FinancialTransaction_realizationId_idx" ON "FinancialTransaction"("realizationId");

-- CreateIndex
CREATE INDEX "FinancialTransaction_accountId_idx" ON "FinancialTransaction"("accountId");

-- CreateIndex
CREATE INDEX "TransactionAttachment_transactionId_idx" ON "TransactionAttachment"("transactionId");

-- CreateIndex
CREATE INDEX "AuditLog_actorId_idx" ON "AuditLog"("actorId");

-- CreateIndex
CREATE INDEX "AuditLog_targetTable_targetId_idx" ON "AuditLog"("targetTable", "targetId");

-- AddForeignKey
ALTER TABLE "BudgetCategory" ADD CONSTRAINT "BudgetCategory_yearId_fkey" FOREIGN KEY ("yearId") REFERENCES "BudgetYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BudgetActivity" ADD CONSTRAINT "BudgetActivity_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "BudgetCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BudgetAllocation" ADD CONSTRAINT "BudgetAllocation_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "BudgetActivity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BudgetAllocation" ADD CONSTRAINT "BudgetAllocation_fundingSourceId_fkey" FOREIGN KEY ("fundingSourceId") REFERENCES "FundingSource"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BudgetRealization" ADD CONSTRAINT "BudgetRealization_allocationId_fkey" FOREIGN KEY ("allocationId") REFERENCES "BudgetAllocation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinancialTransaction" ADD CONSTRAINT "FinancialTransaction_realizationId_fkey" FOREIGN KEY ("realizationId") REFERENCES "BudgetRealization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinancialTransaction" ADD CONSTRAINT "FinancialTransaction_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "VillageBankAccount"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionAttachment" ADD CONSTRAINT "TransactionAttachment_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "FinancialTransaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

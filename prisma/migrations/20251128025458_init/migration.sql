-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'OPERATOR', 'EDITOR', 'USER');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "Religion" AS ENUM ('ISLAM', 'CHRISTIAN', 'CATHOLIC', 'HINDU', 'BUDDHIST', 'CONFUCIAN', 'OTHER');

-- CreateEnum
CREATE TYPE "Education" AS ENUM ('NONE', 'ELEMENTARY', 'JUNIOR_HIGH', 'SENIOR_HIGH', 'VOCATIONAL_HIGH', 'DIPLOMA_1', 'DIPLOMA_2', 'DIPLOMA_3', 'BACHELOR', 'MASTER', 'DOCTORATE', 'OTHER');

-- CreateEnum
CREATE TYPE "MaritalStatus" AS ENUM ('SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED');

-- CreateEnum
CREATE TYPE "Occupation" AS ENUM ('FARMER', 'FISHERMAN', 'TRADER', 'CIVIL_SERVANT', 'MILITARY', 'POLICE', 'PRIVATE_EMPLOYEE', 'TEACHER', 'STUDENT', 'UNIVERSITY_STUDENT', 'LABORER', 'HOUSEWIFE', 'UNEMPLOYED', 'OTHER');

-- CreateEnum
CREATE TYPE "BloodType" AS ENUM ('A', 'B', 'AB', 'O', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "PopulationStatus" AS ENUM ('PERMANENT', 'TEMPORARY', 'MOVED_OUT', 'DECEASED');

-- CreateEnum
CREATE TYPE "DisabilityType" AS ENUM ('NONE', 'PHYSICAL', 'VISUAL', 'HEARING', 'MENTAL', 'INTELLECTUAL', 'MULTIPLE', 'OTHER');

-- CreateEnum
CREATE TYPE "Citizenship" AS ENUM ('WNI', 'WNA');

-- CreateEnum
CREATE TYPE "FamilyRelationship" AS ENUM ('HEAD', 'SPOUSE', 'CHILD', 'PARENT', 'SIBLING', 'OTHER');

-- CreateEnum
CREATE TYPE "RevenueCategory" AS ENUM ('OWN_SOURCE', 'TRANSFER', 'OTHER');

-- CreateEnum
CREATE TYPE "ExpenseSector" AS ENUM ('GOVERNMENT_ADMIN', 'DEVELOPMENT', 'COMMUNITY_GUIDANCE', 'EMPOWERMENT', 'EMERGENCY');

-- CreateEnum
CREATE TYPE "FinancingType" AS ENUM ('RECEIPT', 'EXPENDITURE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "hashedPassword" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("provider","providerAccountId")
);

-- CreateTable
CREATE TABLE "Session" (
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("identifier","token")
);

-- CreateTable
CREATE TABLE "Authenticator" (
    "credentialID" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "credentialPublicKey" TEXT NOT NULL,
    "counter" INTEGER NOT NULL,
    "credentialDeviceType" TEXT NOT NULL,
    "credentialBackedUp" BOOLEAN NOT NULL,
    "transports" TEXT,

    CONSTRAINT "Authenticator_pkey" PRIMARY KEY ("userId","credentialID")
);

-- CreateTable
CREATE TABLE "PasswordResetToken" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "usedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PasswordResetToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VillageConfig" (
    "id" SERIAL NOT NULL,
    "villageCode" VARCHAR(10) NOT NULL,
    "villageName" TEXT NOT NULL,
    "districtCode" VARCHAR(6),
    "districtName" TEXT,
    "regencyCode" VARCHAR(4),
    "regencyName" TEXT,
    "provinceCode" VARCHAR(2),
    "provinceName" TEXT,
    "officeAddress" TEXT,
    "postalCode" VARCHAR(10),
    "phone" TEXT,
    "email" TEXT,
    "website" TEXT,
    "establishedYear" INTEGER,
    "description" TEXT,
    "areaSize" DOUBLE PRECISION,
    "areaUnit" TEXT DEFAULT 'km²',
    "populationTotal" INTEGER DEFAULT 0,
    "hamletCount" INTEGER DEFAULT 0,
    "rwCount" INTEGER DEFAULT 0,
    "rtCount" INTEGER DEFAULT 0,
    "borderNorth" TEXT,
    "borderEast" TEXT,
    "borderSouth" TEXT,
    "borderWest" TEXT,
    "elevation" INTEGER,
    "latitude" DECIMAL(10,8),
    "longitude" DECIMAL(11,8),
    "logoUrl" TEXT,
    "officePhotoUrl" TEXT,
    "vision" TEXT,
    "mission" TEXT,
    "slogan" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VillageConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Family" (
    "id" SERIAL NOT NULL,
    "urlId" TEXT NOT NULL,
    "familyCardNumber" VARCHAR(20) NOT NULL,
    "address" TEXT NOT NULL,
    "dusun" VARCHAR(100) NOT NULL,
    "rw" VARCHAR(10) NOT NULL,
    "rt" VARCHAR(10) NOT NULL,
    "headOfFamilyId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Family_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resident" (
    "id" SERIAL NOT NULL,
    "urlId" TEXT NOT NULL,
    "nik" VARCHAR(16) NOT NULL,
    "fullName" VARCHAR(100) NOT NULL,
    "gender" "Gender" NOT NULL,
    "birthPlace" TEXT,
    "birthDate" TIMESTAMP(3),
    "religion" "Religion",
    "education" "Education",
    "occupation" "Occupation",
    "maritalStatus" "MaritalStatus",
    "bloodType" "BloodType" DEFAULT 'UNKNOWN',
    "disabilityType" "DisabilityType" DEFAULT 'NONE',
    "citizenship" "Citizenship" DEFAULT 'WNI',
    "passportNumber" VARCHAR(50),
    "ethnicity" VARCHAR(100),
    "nationality" VARCHAR(100),
    "address" TEXT,
    "dusun" TEXT,
    "rw" TEXT,
    "rt" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "populationStatus" "PopulationStatus" NOT NULL DEFAULT 'PERMANENT',
    "familyRelationship" "FamilyRelationship",
    "familyId" INTEGER,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Resident_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Visitor" (
    "id" SERIAL NOT NULL,
    "urlId" TEXT NOT NULL,
    "residentId" INTEGER NOT NULL,
    "originAddress" TEXT,
    "originVillage" TEXT,
    "originDistrict" TEXT,
    "originRegency" TEXT,
    "originProvince" TEXT,
    "arrivalDate" TIMESTAMP(3),
    "purpose" TEXT,
    "stayType" TEXT,
    "isStillStaying" BOOLEAN NOT NULL DEFAULT true,
    "departureDate" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Visitor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StaffPosition" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "slug" TEXT NOT NULL,
    "isUnique" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StaffPosition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Staff" (
    "id" SERIAL NOT NULL,
    "residentId" INTEGER NOT NULL,
    "positionTypeId" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StaffHistory" (
    "id" SERIAL NOT NULL,
    "staffId" INTEGER NOT NULL,
    "positionTypeId" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StaffHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrganizationUnit" (
    "id" SERIAL NOT NULL,
    "positionTypeId" INTEGER NOT NULL,
    "parentId" INTEGER,
    "staffId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrganizationUnit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BudgetYear" (
    "id" SERIAL NOT NULL,
    "year" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "isLocked" BOOLEAN NOT NULL DEFAULT false,
    "isFinalized" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "BudgetYear_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Revenue" (
    "id" SERIAL NOT NULL,
    "urlId" TEXT NOT NULL,
    "yearId" INTEGER NOT NULL,
    "category" "RevenueCategory" NOT NULL,
    "description" TEXT NOT NULL,
    "budget" DECIMAL(65,30) NOT NULL,
    "realized" DECIMAL(65,30) NOT NULL,
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
    "budget" DECIMAL(65,30) NOT NULL,
    "realized" DECIMAL(65,30) NOT NULL,
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
    "amount" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Financing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImageAsset" (
    "id" TEXT NOT NULL,
    "bucketKey" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "width" INTEGER,
    "height" INTEGER,
    "alt" TEXT,
    "description" TEXT,
    "variants" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ImageAsset_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "Authenticator_credentialID_key" ON "Authenticator"("credentialID");

-- CreateIndex
CREATE INDEX "PasswordResetToken_userId_idx" ON "PasswordResetToken"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "VillageConfig_villageCode_key" ON "VillageConfig"("villageCode");

-- CreateIndex
CREATE UNIQUE INDEX "Family_urlId_key" ON "Family"("urlId");

-- CreateIndex
CREATE UNIQUE INDEX "Family_familyCardNumber_key" ON "Family"("familyCardNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Family_headOfFamilyId_key" ON "Family"("headOfFamilyId");

-- CreateIndex
CREATE INDEX "Family_dusun_rw_rt_idx" ON "Family"("dusun", "rw", "rt");

-- CreateIndex
CREATE UNIQUE INDEX "Resident_urlId_key" ON "Resident"("urlId");

-- CreateIndex
CREATE UNIQUE INDEX "Resident_nik_key" ON "Resident"("nik");

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
CREATE UNIQUE INDEX "Visitor_residentId_key" ON "Visitor"("residentId");

-- CreateIndex
CREATE INDEX "Visitor_arrivalDate_idx" ON "Visitor"("arrivalDate");

-- CreateIndex
CREATE INDEX "Visitor_departureDate_idx" ON "Visitor"("departureDate");

-- CreateIndex
CREATE UNIQUE INDEX "StaffPosition_slug_key" ON "StaffPosition"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationUnit_staffId_key" ON "OrganizationUnit"("staffId");

-- CreateIndex
CREATE UNIQUE INDEX "BudgetYear_year_key" ON "BudgetYear"("year");

-- CreateIndex
CREATE UNIQUE INDEX "Revenue_urlId_key" ON "Revenue"("urlId");

-- CreateIndex
CREATE UNIQUE INDEX "Expense_urlId_key" ON "Expense"("urlId");

-- CreateIndex
CREATE UNIQUE INDEX "Financing_urlId_key" ON "Financing"("urlId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Authenticator" ADD CONSTRAINT "Authenticator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PasswordResetToken" ADD CONSTRAINT "PasswordResetToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Family" ADD CONSTRAINT "Family_headOfFamilyId_fkey" FOREIGN KEY ("headOfFamilyId") REFERENCES "Resident"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resident" ADD CONSTRAINT "Resident_familyId_fkey" FOREIGN KEY ("familyId") REFERENCES "Family"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visitor" ADD CONSTRAINT "Visitor_residentId_fkey" FOREIGN KEY ("residentId") REFERENCES "Resident"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_residentId_fkey" FOREIGN KEY ("residentId") REFERENCES "Resident"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_positionTypeId_fkey" FOREIGN KEY ("positionTypeId") REFERENCES "StaffPosition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StaffHistory" ADD CONSTRAINT "StaffHistory_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StaffHistory" ADD CONSTRAINT "StaffHistory_positionTypeId_fkey" FOREIGN KEY ("positionTypeId") REFERENCES "StaffPosition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationUnit" ADD CONSTRAINT "OrganizationUnit_positionTypeId_fkey" FOREIGN KEY ("positionTypeId") REFERENCES "StaffPosition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationUnit" ADD CONSTRAINT "OrganizationUnit_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "OrganizationUnit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationUnit" ADD CONSTRAINT "OrganizationUnit_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Revenue" ADD CONSTRAINT "Revenue_yearId_fkey" FOREIGN KEY ("yearId") REFERENCES "BudgetYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_yearId_fkey" FOREIGN KEY ("yearId") REFERENCES "BudgetYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Financing" ADD CONSTRAINT "Financing_yearId_fkey" FOREIGN KEY ("yearId") REFERENCES "BudgetYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

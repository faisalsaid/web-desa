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
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'OPERATOR', 'EDITOR', 'USER');

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
    "familyCardNumber" VARCHAR(20) NOT NULL,
    "address" TEXT,
    "dusun" VARCHAR(100),
    "rw" VARCHAR(10),
    "rt" VARCHAR(10),
    "headOfFamilyId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Family_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resident" (
    "id" SERIAL NOT NULL,
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
    "familyId" INTEGER,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Resident_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Visitor" (
    "id" SERIAL NOT NULL,
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
CREATE UNIQUE INDEX "Family_familyCardNumber_key" ON "Family"("familyCardNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Family_headOfFamilyId_key" ON "Family"("headOfFamilyId");

-- CreateIndex
CREATE UNIQUE INDEX "Resident_nik_key" ON "Resident"("nik");

-- CreateIndex
CREATE UNIQUE INDEX "Visitor_residentId_key" ON "Visitor"("residentId");

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

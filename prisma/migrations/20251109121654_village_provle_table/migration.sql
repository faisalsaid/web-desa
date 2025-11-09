-- CreateTable
CREATE TABLE "VillageProfile" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "country" TEXT,
    "province" TEXT,
    "regency" TEXT,
    "district" TEXT,
    "village" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "areaKm2" DOUBLE PRECISION,
    "elevation" INTEGER,
    "population" INTEGER,
    "vision" TEXT,
    "mission" TEXT,
    "northBorder" TEXT,
    "eastBorder" TEXT,
    "southBorder" TEXT,
    "westBorder" TEXT,
    "mapUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VillageProfile_pkey" PRIMARY KEY ("id")
);

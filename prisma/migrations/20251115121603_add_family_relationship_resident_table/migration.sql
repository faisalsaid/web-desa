-- CreateEnum
CREATE TYPE "FamilyRelationship" AS ENUM ('HEAD', 'SPOUSE', 'CHILD', 'PARENT', 'OTHER');

-- AlterTable
ALTER TABLE "Resident" ADD COLUMN     "familyRelationship" "FamilyRelationship";

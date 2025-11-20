/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `StaffPositionType` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "StaffPositionType_name_key" ON "StaffPositionType"("name");

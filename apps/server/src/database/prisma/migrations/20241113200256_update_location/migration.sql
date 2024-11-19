/*
  Warnings:

  - Added the required column `name` to the `locations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "locations" ADD COLUMN     "name" TEXT NOT NULL;

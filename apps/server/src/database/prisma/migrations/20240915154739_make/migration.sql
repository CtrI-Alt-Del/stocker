/*
  Warnings:

  - Made the column `expiration_date` on table `batches` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "batches" ALTER COLUMN "expiration_date" SET NOT NULL;

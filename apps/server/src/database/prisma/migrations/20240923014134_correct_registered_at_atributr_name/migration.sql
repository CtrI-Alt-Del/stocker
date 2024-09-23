/*
  Warnings:

  - You are about to drop the column `resgitered_at` on the `batches` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "batches" DROP COLUMN "resgitered_at",
ADD COLUMN     "registered_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

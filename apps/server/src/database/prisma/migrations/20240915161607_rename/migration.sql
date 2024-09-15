/*
  Warnings:

  - You are about to drop the column `movemented_at` on the `inventory_movements` table. All the data in the column will be lost.
  - Added the required column `registered_at` to the `inventory_movements` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "inventory_movements" DROP COLUMN "movemented_at",
ADD COLUMN     "registered_at" TIMESTAMP(3) NOT NULL;

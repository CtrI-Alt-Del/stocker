/*
  Warnings:

  - You are about to drop the column `quantity` on the `batches` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `inventory_movements` table. All the data in the column will be lost.
  - Added the required column `items_count` to the `batches` table without a default value. This is not possible if the table is not empty.
  - Added the required column `items_count` to the `inventory_movements` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "batches" DROP COLUMN "quantity",
ADD COLUMN     "items_count" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "inventory_movements" DROP COLUMN "quantity",
ADD COLUMN     "items_count" INTEGER NOT NULL;

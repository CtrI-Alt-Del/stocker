/*
  Warnings:

  - You are about to drop the column `type` on the `inventory_movements` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "inventory_movements" DROP COLUMN "type",
ADD COLUMN     "movement_type" "InventoryMovementType" NOT NULL DEFAULT 'INBOUND';

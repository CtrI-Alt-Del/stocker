/*
  Warnings:

  - You are about to drop the `expiration-date-notification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `stock-level-notifications` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "expiration-date-notification" DROP CONSTRAINT "expiration-date-notification_batch_id_fkey";

-- DropForeignKey
ALTER TABLE "stock-level-notifications" DROP CONSTRAINT "stock-level-notifications_product_id_fkey";

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "supplier_id" TEXT;

-- DropTable
DROP TABLE "expiration-date-notification";

-- DropTable
DROP TABLE "stock-level-notifications";

-- CreateTable
CREATE TABLE "stock_level_notifications" (
    "id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "registered_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "stock_level_notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expiration_date_notification" (
    "id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "batch_id" TEXT NOT NULL,
    "registered_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "expiration_date_notification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "stock_level_notifications" ADD CONSTRAINT "stock_level_notifications_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expiration_date_notification" ADD CONSTRAINT "expiration_date_notification_batch_id_fkey" FOREIGN KEY ("batch_id") REFERENCES "batches"("id") ON DELETE CASCADE ON UPDATE CASCADE;

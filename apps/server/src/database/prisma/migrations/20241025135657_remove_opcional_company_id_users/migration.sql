/*
  Warnings:

  - You are about to drop the `notifications` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `company_id` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_batch_id_fkey";

-- DropForeignKey
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_product_id_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "company_id" SET NOT NULL;

-- DropTable
DROP TABLE "notifications";

-- CreateTable
CREATE TABLE "stock-level-notifications" (
    "id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "stock-level-notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expiration-date-notification" (
    "id" TEXT NOT NULL,
    "batch_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "expiration-date-notification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "stock-level-notifications" ADD CONSTRAINT "stock-level-notifications_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expiration-date-notification" ADD CONSTRAINT "expiration-date-notification_batch_id_fkey" FOREIGN KEY ("batch_id") REFERENCES "batches"("id") ON DELETE CASCADE ON UPDATE CASCADE;

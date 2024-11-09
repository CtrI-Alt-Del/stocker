/*
  Warnings:

  - You are about to drop the column `created_at` on the `expiration-date-notification` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `stock-level-notifications` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "registered_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "expiration-date-notification" DROP COLUMN "created_at",
ADD COLUMN     "registered_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "locations" ADD COLUMN     "registered_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "registered_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "stock-level-notifications" DROP COLUMN "created_at",
ADD COLUMN     "registered_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "suppliers" ADD COLUMN     "registered_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "registered_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

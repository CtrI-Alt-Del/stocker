/*
  Warnings:

  - Added the required column `company_id` to the `expiration-date-notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `company_id` to the `stock-level-notifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `users` table without a default value. This is not possible if the table is not empty.
  - Made the column `company_id` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "expiration-date-notification" ADD COLUMN     "company_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "stock-level-notifications" ADD COLUMN     "company_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "password" TEXT NOT NULL,
ALTER COLUMN "company_id" SET NOT NULL;

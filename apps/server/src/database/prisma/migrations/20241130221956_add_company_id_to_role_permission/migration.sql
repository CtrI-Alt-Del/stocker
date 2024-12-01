/*
  Warnings:

  - Added the required column `company_id` to the `role_permission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "role_permission" ADD COLUMN     "company_id" TEXT NOT NULL;

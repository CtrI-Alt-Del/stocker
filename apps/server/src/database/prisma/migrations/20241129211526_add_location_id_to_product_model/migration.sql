-- AlterTable
ALTER TABLE "products" ADD COLUMN     "location_id" TEXT;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- DropIndex
DROP INDEX "products_name_description_price_tags_idx";

-- CreateIndex
CREATE INDEX "products_name_description_tags_idx" ON "products"("name", "description", "tags");

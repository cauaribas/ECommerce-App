-- CreateIndex
CREATE INDEX "products_name_description_price_tags_idx" ON "products"("name", "description", "price", "tags");

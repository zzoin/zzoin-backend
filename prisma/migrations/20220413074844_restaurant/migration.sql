/*
  Warnings:

  - Added the required column `name` to the `RESTAURANT` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RESTAURANT" ADD COLUMN     "address" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "mapUrl" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "openingHours" TEXT,
ADD COLUMN     "phoneNumber" TEXT;

-- CreateTable
CREATE TABLE "__category_on_restaurant" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "__option_on_restaurant" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "__category_on_restaurant_AB_unique" ON "__category_on_restaurant"("A", "B");

-- CreateIndex
CREATE INDEX "__category_on_restaurant_B_index" ON "__category_on_restaurant"("B");

-- CreateIndex
CREATE UNIQUE INDEX "__option_on_restaurant_AB_unique" ON "__option_on_restaurant"("A", "B");

-- CreateIndex
CREATE INDEX "__option_on_restaurant_B_index" ON "__option_on_restaurant"("B");

-- AddForeignKey
ALTER TABLE "__category_on_restaurant" ADD FOREIGN KEY ("A") REFERENCES "CATEGORY"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "__category_on_restaurant" ADD FOREIGN KEY ("B") REFERENCES "RESTAURANT"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "__option_on_restaurant" ADD FOREIGN KEY ("A") REFERENCES "OPTION"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "__option_on_restaurant" ADD FOREIGN KEY ("B") REFERENCES "RESTAURANT"("id") ON DELETE CASCADE ON UPDATE CASCADE;

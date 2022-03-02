-- CreateTable
CREATE TABLE "MENU" (
    "id" TEXT NOT NULL,
    "restaurantId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "MENU_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MENU" ADD CONSTRAINT "MENU_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "RESTAURANT"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

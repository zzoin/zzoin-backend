-- CreateTable
CREATE TABLE "REVIEW" (
    "id" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "restaurantId" TEXT NOT NULL,
    "content" VARCHAR(500) NOT NULL,
    "score" SMALLINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "REVIEW_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RESTAURANT" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "RESTAURANT_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CATEGORY" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "iconImageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "CATEGORY_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "REVIEW" ADD CONSTRAINT "REVIEW_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "USER"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "REVIEW" ADD CONSTRAINT "REVIEW_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "RESTAURANT"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
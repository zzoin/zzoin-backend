-- CreateTable
CREATE TABLE "OPTION" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "iconImageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "OPTION_pkey" PRIMARY KEY ("id")
);

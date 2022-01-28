-- CreateTable
CREATE TABLE "USER" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(80) NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "bio" VARCHAR(400) NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "profileImageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "USER_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "USER_email_key" ON "USER"("email");

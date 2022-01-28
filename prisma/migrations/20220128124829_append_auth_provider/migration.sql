-- CreateEnum
CREATE TYPE "AuthProvider" AS ENUM ('GOOGLE');

-- AlterTable
ALTER TABLE "USER" ADD COLUMN     "authProvider" "AuthProvider" NOT NULL DEFAULT E'GOOGLE';

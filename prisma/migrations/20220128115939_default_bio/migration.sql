/*
  Warnings:

  - Made the column `bio` on table `USER` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "USER" ALTER COLUMN "bio" SET NOT NULL,
ALTER COLUMN "bio" SET DEFAULT E'';

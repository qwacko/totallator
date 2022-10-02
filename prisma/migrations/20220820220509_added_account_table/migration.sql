/*
  Warnings:

  - The `status` column on the `AccountGrouping` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "PrismaStatusEnum" AS ENUM ('Active', 'Disabled', 'Deleted');

-- CreateEnum
CREATE TYPE "PrismaAccountEnum" AS ENUM ('Income', 'Expense', 'Asset', 'Liability');

-- AlterTable
ALTER TABLE "AccountGrouping" DROP COLUMN "status",
ADD COLUMN     "status" "PrismaStatusEnum" NOT NULL DEFAULT 'Active',
ALTER COLUMN "deleted" SET DEFAULT false,
ALTER COLUMN "active" SET DEFAULT true,
ALTER COLUMN "disabled" SET DEFAULT false,
ALTER COLUMN "allowUpdate" SET DEFAULT true;

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" "PrismaAccountEnum" NOT NULL DEFAULT 'Expense',
    "isCash" BOOLEAN NOT NULL DEFAULT true,
    "isNetWorth" BOOLEAN NOT NULL DEFAULT true,
    "accountGroup" TEXT,
    "accountGroup2" TEXT,
    "accountGroup3" TEXT,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "accountGroupingId" TEXT NOT NULL,
    "status" "PrismaStatusEnum" NOT NULL DEFAULT 'Active',
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "disabled" BOOLEAN NOT NULL DEFAULT false,
    "allowUpdate" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_id_key" ON "Account"("id");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_accountGroupingId_fkey" FOREIGN KEY ("accountGroupingId") REFERENCES "AccountGrouping"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

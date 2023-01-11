-- AlterTable
ALTER TABLE "User" ADD COLUMN     "currencyFormat" TEXT,
ADD COLUMN     "darkMode" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "dateFormat" TEXT,
ADD COLUMN     "firstMonthFY" INTEGER NOT NULL DEFAULT 1;

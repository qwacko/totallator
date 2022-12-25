/*
  Warnings:

  - You are about to alter the column `amount` on the `JournalEntry` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(40,8)`.

*/
-- AlterTable
ALTER TABLE "JournalEntry" ALTER COLUMN "amount" SET DATA TYPE DECIMAL(40,8);

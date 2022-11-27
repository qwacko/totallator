/*
  Warnings:

  - You are about to drop the column `primaryJournalId` on the `JournalEntry` table. All the data in the column will be lost.
  - Added the required column `transactionId` to the `JournalEntry` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "JournalEntry" DROP CONSTRAINT "JournalEntry_primaryJournalId_fkey";

-- AlterTable
ALTER TABLE "JournalEntry" DROP COLUMN "primaryJournalId",
ADD COLUMN     "transactionId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_id_key" ON "Transaction"("id");

-- AddForeignKey
ALTER TABLE "JournalEntry" ADD CONSTRAINT "JournalEntry_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AlterTable
ALTER TABLE "JournalEntry" ADD COLUMN     "year" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "yearMonth" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "yearMonthDay" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "yearQuarter" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "yearWeek" TEXT NOT NULL DEFAULT '';

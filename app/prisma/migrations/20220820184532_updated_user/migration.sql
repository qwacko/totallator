/*
  Warnings:

  - Changed the type of `darkMode` on the `user` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "user" ALTER COLUMN "dateFormat" SET DATA TYPE TEXT,
DROP COLUMN "darkMode",
ADD COLUMN     "darkMode" BOOLEAN NOT NULL;

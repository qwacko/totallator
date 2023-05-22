/*
  Warnings:

  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropForeignKey
ALTER TABLE "_AdminUsers" DROP CONSTRAINT "_AdminUsers_B_fkey";

-- DropForeignKey
ALTER TABLE "_ViewUsers" DROP CONSTRAINT "_ViewUsers_B_fkey";

-- AlterTable
ALTER TABLE "auth_user" ADD COLUMN     "admin" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "currencyFormat" TEXT,
ADD COLUMN     "darkMode" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "dateFormat" TEXT,
ADD COLUMN     "firstMonthFY" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "name" TEXT;

-- DropTable
DROP TABLE "Account";

-- DropTable
DROP TABLE "Session";

-- DropTable
DROP TABLE "User";

-- AddForeignKey
ALTER TABLE "_AdminUsers" ADD CONSTRAINT "_AdminUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "auth_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ViewUsers" ADD CONSTRAINT "_ViewUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "auth_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

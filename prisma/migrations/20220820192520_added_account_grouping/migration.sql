-- CreateTable
CREATE TABLE "AccountGrouping" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL,
    "active" BOOLEAN NOT NULL,
    "disabled" BOOLEAN NOT NULL,
    "allowUpdate" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AccountGrouping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AdminUsers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ViewUsers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "AccountGrouping_id_key" ON "AccountGrouping"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_AdminUsers_AB_unique" ON "_AdminUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_AdminUsers_B_index" ON "_AdminUsers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ViewUsers_AB_unique" ON "_ViewUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_ViewUsers_B_index" ON "_ViewUsers"("B");

-- AddForeignKey
ALTER TABLE "_AdminUsers" ADD CONSTRAINT "_AdminUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "AccountGrouping"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdminUsers" ADD CONSTRAINT "_AdminUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ViewUsers" ADD CONSTRAINT "_ViewUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "AccountGrouping"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ViewUsers" ADD CONSTRAINT "_ViewUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- CreateIndex
CREATE INDEX "JournalEntry_accountId_idx" ON "JournalEntry"("accountId");

-- CreateIndex
CREATE INDEX "JournalEntry_accountGroupingId_idx" ON "JournalEntry"("accountGroupingId");

-- CreateIndex
CREATE INDEX "JournalEntry_date_idx" ON "JournalEntry"("date");

-- CreateIndex
CREATE INDEX "JournalEntry_tagId_idx" ON "JournalEntry"("tagId");

-- CreateIndex
CREATE INDEX "JournalEntry_categoryId_idx" ON "JournalEntry"("categoryId");

-- CreateIndex
CREATE INDEX "JournalEntry_billId_idx" ON "JournalEntry"("billId");

-- CreateIndex
CREATE INDEX "JournalEntry_budgetId_idx" ON "JournalEntry"("budgetId");

-- CreateIndex
CREATE INDEX "JournalEntry_description_idx" ON "JournalEntry"("description");

-- CreateIndex
CREATE INDEX "JournalEntry_linked_idx" ON "JournalEntry"("linked");

-- CreateIndex
CREATE INDEX "JournalEntry_reconciled_idx" ON "JournalEntry"("reconciled");

-- CreateIndex
CREATE INDEX "JournalEntry_dataChecked_idx" ON "JournalEntry"("dataChecked");

-- CreateIndex
CREATE INDEX "JournalEntry_complete_idx" ON "JournalEntry"("complete");

-- CreateIndex
CREATE INDEX "JournalEntry_amount_idx" ON "JournalEntry"("amount");

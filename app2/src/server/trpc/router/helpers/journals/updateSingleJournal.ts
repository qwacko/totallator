import type { JournalEntry, Prisma, PrismaClient } from "@prisma/client";
import { type UpdateJournalDataInputType } from "src/utils/validation/journalEntries/updateJournalValidation";
import { TRPCError } from "@trpc/server";
import { checkLinkedItems } from "../checkLinkedItems";

export const updateSingleJournal = async ({
  prisma,
  journal,
  data,
  updateCompleted = false,
}: {
  prisma: PrismaClient | Prisma.TransactionClient;
  journal: JournalEntry;
  data: UpdateJournalDataInputType;
  updateCompleted?: boolean;
}) => {
  if (!updateCompleted && journal.complete) {
    throw new TRPCError({
      message: "Cannot modify completed journal",
      code: "BAD_REQUEST",
    });
  }
  //Check Linked Data (Account, Category etc..)
  await checkLinkedItems({
    client: prisma,
    accountGroupingId: journal.accountGroupingId,
    accountIds: [data.accountId],
    billIds: [data.billId],
    budgetIds: [data.budgetId],
    categoryIds: [data.categoryId],
    tagIds: [data.tagId],
  });

  //Split data into items to be updated on linked and individual journals
  if (!journal.linked) {
    await prisma.journalEntry.update({ where: { id: journal.id }, data });
  } else {
    const { amount, accountId, ...linkedProperties } = data;

    if (amount !== undefined || accountId) {
      await prisma.journalEntry.update({
        where: { id: journal.id },
        data: { amount: data.amount, accountId: data.accountId },
      });
    }

    if (Object.keys(linkedProperties).length > 0) {
      await prisma.journalEntry.updateMany({
        where: { transactionId: journal.transactionId },
        data: linkedProperties,
      });
    }
  }
};

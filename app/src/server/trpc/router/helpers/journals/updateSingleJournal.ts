import type { JournalEntry, Prisma, PrismaClient } from "@prisma/client";
import { type UpdateJournalDataInputType } from "src/utils/validation/journalEntries/updateJournalValidation";
import { TRPCError } from "@trpc/server";
import { checkLinkedItems } from "../checkLinkedItems";
import { omit } from "lodash";

export const updateSingleJournal = async ({
  prisma,
  journal,
  data,
  updateCompleted = false,
  dontUpdateOtherAmounts = false,
}: {
  prisma: PrismaClient | Prisma.TransactionClient;
  journal: JournalEntry;
  data: UpdateJournalDataInputType;
  updateCompleted?: boolean;
  dontUpdateOtherAmounts?: boolean;
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

  const dataWithoutOther = omit(data, ["otherJournals"]);

  //Split data into items to be updated on linked and individual journals
  if (!journal.linked) {
    await prisma.journalEntry.update({
      where: { id: journal.id },
      data: dataWithoutOther,
    });
  } else {
    const { amount, accountId, ...linkedProperties } = dataWithoutOther;

    if (amount !== undefined || accountId) {
      console.log("Updating Amount Or account for linked", {
        amount,
        accountId,
      });
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

  //Update Other Amounts
  if (data.amount !== undefined && !dontUpdateOtherAmounts) {
    const transaction = await prisma.transaction.findUnique({
      where: { id: journal.transactionId },
      include: { journalEntries: true },
    });
    if (transaction) {
      const total = transaction.journalEntries
        .map((item) => item.amount)
        .reduce((prev, current) => prev + current, 0);
      const first = transaction.journalEntries[0];

      if (total !== 0 && first) {
        const oldestTrans = transaction.journalEntries.reduce(
          (prev, current) =>
            current.updatedAt < prev?.updatedAt ? current : prev,
          first
        );

        await prisma.journalEntry.update({
          where: { id: oldestTrans.id },
          data: { amount: oldestTrans.amount - total },
        });
      }
    }
  }
};

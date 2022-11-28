import type { Prisma, PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { compareLinked } from "src/utils/compareLinked";

export const checkTransactions = async ({
  prisma,
  transactionIds,
}: {
  prisma: PrismaClient | Prisma.TransactionClient;
  transactionIds: string[];
}) => {
  const transactions = await prisma.transaction.findMany({
    where: { id: { in: transactionIds } },
    include: { journalEntries: true },
  });

  transactions.map((transaction) => {
    if (!transaction) {
      throw new TRPCError({
        message: "Transaction not found for checking. Internal Error",
        code: "INTERNAL_SERVER_ERROR",
      });
    }

    //Check Amount = 0
    const total = transaction.journalEntries
      .map((item) => item.amount)
      .reduce((prev, current) => prev + current, 0);
    if (total !== 0) {
      throw new TRPCError({
        message: `Transaction total doesn't equal zero (${transaction.journalEntries[0]?.description}). Make sure to update all of transaction.`,
        code: "BAD_REQUEST",
      });
    }

    //Check number of journal entries
    const journalEntryCount = transaction.journalEntries.length;
    if (journalEntryCount < 2) {
      throw new TRPCError({
        message: "Transaction has too few journals",
        code: "BAD_REQUEST",
      });
    }

    //Check linked items match
    const firstJournal = transaction.journalEntries[0];
    if (firstJournal) {
      const linked = firstJournal.linked;
      if (linked) {
        transaction.journalEntries.map((journal) => {
          const linkedMatched = compareLinked(journal, firstJournal);

          if (!linkedMatched) {
            throw new TRPCError({
              message:
                "For a linked transaction, some linked properties don't match",
              code: "BAD_REQUEST",
            });
          }
        });
      }
    }
  });
};

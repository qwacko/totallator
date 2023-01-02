import type { Prisma, PrismaClient } from "@prisma/client";
import type { JournalFilterValidation } from "src/utils/validation/journalEntries/getJournalValidation";

export const journalsWithStats = async ({
  prisma,
  orderBy,
  take,
  skip,
  filters,
  userId,
}: {
  prisma: PrismaClient | Prisma.TransactionClient;
  orderBy?:
    | Prisma.Enumerable<Prisma.JournalEntryOrderByWithRelationAndSearchRelevanceInput>
    | undefined;
  take: number;
  skip: number;
  filters: JournalFilterValidation[] | undefined;
  userId: string;
}) => {
  const allJournals = await prisma.journalEntry.findMany({
    where: {
      AND: [
        ...(filters ? filters : []),
        {
          accountGrouping: { viewUsers: { some: { id: userId } } },
        },
      ],
    },
    include: {
      accountGrouping: { include: { viewUsers: true, adminUsers: true } },
      transaction: { select: { journalEntries: true } },
    },
    orderBy,
  });

  const count = allJournals.length;
  const startingTotal = allJournals
    .slice(skip + take)
    .reduce((prev, current) => prev + current.amount.toNumber(), 0);
  const selected = allJournals.slice(skip, skip + take);
  const selectedWithRunningTotal = selected.map((item, index) => {
    const sinceStart = selected
      .filter((_, idx) => idx >= index)
      .reduce((prev, current) => prev + current.amount.toNumber(), 0);

    return { ...item, total: sinceStart + startingTotal };
  });

  return {
    count,
    data: selected,
    dataWithTotal: selectedWithRunningTotal,
    total: startingTotal,
  };
};

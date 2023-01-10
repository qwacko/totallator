import type { Prisma, PrismaClient } from "@prisma/client";
import type { JournalFilterValidation } from "src/utils/validation/journalEntries/getJournalValidation";

const filtersToQuery = async ({
  prisma,
  filters,
  userId,
}: {
  prisma: PrismaClient | Prisma.TransactionClient;
  filters: JournalFilterValidation[] | undefined;
  userId: string;
}) => {
  const accountGroupings = await prisma.accountGrouping.findMany({
    where: { viewUsers: { some: { id: userId } } },
  });
  const accountGroupingIds = accountGroupings.map((item) => item.id);
  const returnFilters: JournalFilterValidation[] = filters
    ? await Promise.all(
        filters.map(async (filter) => {
          if (filter.account) {
            const accounts = await prisma.transactionAccount.findMany({
              where: {
                AND: [
                  filter.account,
                  {
                    accountGroupingId: { in: accountGroupingIds },
                  },
                ],
              },
            });
            const accountIds = accounts.map((item) => item.id);
            delete filter.account;
            filter.accountId = {
              in: [
                ...(filter?.accountId?.in ? filter.accountId.in : []),
                ...accountIds,
              ],
            };
          }
          return filter;
        })
      )
    : [];

  return returnFilters;
};
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
  const accountGroupings = await prisma.accountGrouping.findMany({
    where: { viewUsers: { some: { id: userId } } },
  });
  const accountGroupingIds = accountGroupings.map((item) => item.id);

  const [allJournals, journalCountDefault, journalTotalDefault] =
    await Promise.all([
      prisma.journalEntry.findMany({
        where: {
          AND: [
            ...(await filtersToQuery({ prisma, userId, filters })),
            {
              accountGroupingId: { in: accountGroupingIds },
            },
          ],
        },
        include: {
          accountGrouping: { include: { viewUsers: true, adminUsers: true } },
          transaction: { select: { journalEntries: true } },
        },
        orderBy,
        take,
        skip,
      }),
      prisma.journalEntry.count({
        where: {
          AND: [
            ...(await filtersToQuery({ prisma, userId, filters })),
            {
              accountGroupingId: { in: accountGroupingIds },
            },
          ],
        },
      }),
      prisma.journalEntry.aggregate({
        where: {
          AND: [
            ...(await filtersToQuery({ prisma, userId, filters })),
            {
              accountGroupingId: { in: accountGroupingIds },
            },
          ],
        },
        orderBy,
        _sum: { amount: true },
        skip: skip + take,
      }),
    ]);

  const count = journalCountDefault;
  const startingTotalMaybeNull = journalTotalDefault._sum.amount;
  const startingTotal = startingTotalMaybeNull
    ? startingTotalMaybeNull.toNumber()
    : 0;
  const selected = allJournals;

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

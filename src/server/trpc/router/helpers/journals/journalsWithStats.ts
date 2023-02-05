import type { Prisma, PrismaClient, User } from "@prisma/client";

import { dateRangeToDates } from "src/utils/validation/journalEntries/dateRangeToDates";
import type { JournalFilterValidation } from "src/utils/validation/journalEntries/getJournalValidation";

export const filtersToQuery = async ({
  prisma,
  filters,
  user
}: {
  prisma: PrismaClient | Prisma.TransactionClient;
  filters: JournalFilterValidation[] | undefined;
  user: User;
}) => {
  const accountGroupings = await prisma.accountGrouping.findMany({
    where: { viewUsers: { some: { id: user.id } } }
  });
  const accountGroupingIds = accountGroupings.map((item) => item.id);
  const returnFilters: JournalFilterValidation[] = filters
    ? await Promise.all(
        filters.map(async (filter) => {
          if (filter.dateRange) {
            const dateRange = dateRangeToDates({
              dateRange: filter.dateRange,
              user
            });
            if (dateRange) {
              filter.date = { gte: dateRange.start, lte: dateRange.end };
            }
            delete filter.dateRange;
          }
          if (filter.account) {
            const accounts = await prisma.transactionAccount.findMany({
              where: {
                AND: [
                  filter.account,
                  {
                    accountGroupingId: { in: accountGroupingIds }
                  }
                ]
              }
            });
            const accountIds = accounts.map((item) => item.id);
            delete filter.account;
            filter.accountId = {
              in: [
                ...(filter?.accountId?.in ? filter.accountId.in : []),
                ...accountIds
              ]
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
  user
}: {
  prisma: PrismaClient | Prisma.TransactionClient;
  orderBy?:
    | Prisma.Enumerable<Prisma.JournalEntryOrderByWithRelationAndSearchRelevanceInput>
    | undefined;
  take: number;
  skip: number;
  filters: JournalFilterValidation[] | undefined;
  user: User;
}) => {
  const [allJournals, journalCountDefault, journalTotalDefault] =
    await Promise.all([
      prisma.journalEntry.findMany({
        where: {
          AND: await filtersToQuery({ prisma, user, filters })
        },
        include: {
          accountGrouping: {
            include: {
              viewUsers: true,
              adminUsers: true
            }
          },
          transaction: { select: { journalEntries: true } }
        },
        orderBy,
        take,
        skip
      }),
      prisma.journalEntry.count({
        where: {
          AND: await filtersToQuery({ prisma, user, filters })
        }
      }),
      prisma.journalEntry.aggregate({
        where: {
          AND: await filtersToQuery({ prisma, user, filters })
        },
        orderBy,
        _sum: { amount: true },
        skip: skip + take
      })
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
    total: startingTotal
  };
};

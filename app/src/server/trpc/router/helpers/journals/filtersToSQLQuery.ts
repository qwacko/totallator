import { Prisma, PrismaClient } from "@prisma/client";
import { JournalFilterValidation } from "src/utils/validation/journalEntries/getJournalValidation";

export const filtersToSQLQuery = async ({
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

  let returnSQL = Prisma.sql` "JournalEntryView"."accountGroupingId" IN (${Prisma.join(
    accountGroupingIds
  )})`;

  if (filters) {
    await Promise.all(
      filters.map(async (filter) => {
        if (filter.accountId) {
          returnSQL = Prisma.sql`${returnSQL} AND "JournalEntryView"."accountId" IN (${Prisma.join(
            filter.accountId.in ? filter.accountId.in : []
          )})`;
        }
        if (filter.accountGroupingId) {
          returnSQL = Prisma.sql`${returnSQL} AND "JournalEntryView"."accountGroupingId" IN (${Prisma.join(
            filter.accountGroupingId.in ? filter.accountGroupingId.in : []
          )})`;
        }

        if (filter.billId) {
          returnSQL = Prisma.sql`${returnSQL} AND "JournalEntryView"."billId" IN (${Prisma.join(
            filter.billId.in ? filter.billId.in : []
          )})`;
        }

        if (filter.budgetId) {
          returnSQL = Prisma.sql`${returnSQL} AND "JournalEntryView"."budgetId" IN (${Prisma.join(
            filter.budgetId.in ? filter.budgetId.in : []
          )})`;
        }

        if (filter.tagId) {
          returnSQL = Prisma.sql`${returnSQL} AND "JournalEntryView"."tagId" IN (${Prisma.join(
            filter.tagId.in ? filter.tagId.in : []
          )})`;
        }

        if (filter.categoryId) {
          returnSQL = Prisma.sql`${returnSQL} AND "JournalEntryView"."categoryId" IN (${Prisma.join(
            filter.categoryId.in ? filter.categoryId.in : []
          )})`;
        }

        if (filter.account) {
          const accounts = await prisma.transactionAccount.findMany({
            where: {
              accountGroupingId: { in: accountGroupingIds },
              ...filter.account,
            },
          });
          returnSQL = Prisma.sql`${returnSQL} AND "JournalEntryView"."accountId" IN (${Prisma.join(
            accounts.map((item) => item.id)
          )})`;
        }

        if (filter.amount) {
          if (typeof filter.amount.gte === "number") {
            returnSQL = Prisma.sql`${returnSQL} AND "JournalEntryView"."amount" >= ${filter.amount.gte}`;
          }
          if (typeof filter.amount.lte === "number") {
            returnSQL = Prisma.sql`${returnSQL} AND "JournalEntryView"."amount" <= ${filter.amount.lte}`;
          }
        }
      })
    );
  }

  returnSQL = Prisma.sql`${returnSQL}  `;
  return returnSQL;
};

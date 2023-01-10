import type { Prisma, PrismaClient } from "@prisma/client";

export const checkCanSeed = async ({
  prisma,
  accountGroupingId,
}: {
  prisma: PrismaClient | Prisma.TransactionClient;
  accountGroupingId: string;
}) => {
  const accountGrouping = await prisma.accountGrouping.findUnique({
    where: { id: accountGroupingId },
    include: {
      _count: {
        select: {
          accounts: true,
          journalEntries: true,
          categories: true,
          bills: true,
          budgets: true,
          tags: true,
        },
      },
    },
  });

  if (
    !accountGrouping ||
    accountGrouping._count.accounts > 0 ||
    accountGrouping._count.journalEntries > 0 ||
    accountGrouping._count.categories > 0 ||
    accountGrouping._count.bills > 0 ||
    accountGrouping._count.budgets > 0 ||
    accountGrouping._count.tags > 0
  ) {
    return undefined;
  }

  return accountGrouping;
};

import { TRPCError } from "@trpc/server";
import type { Prisma, PrismaClient } from "@prisma/client";

const checkItem = ({
  accountGroupingIds,
  targetIds,
  targetAG,
  errorTitle,
}: {
  accountGroupingIds: string[];
  targetIds: (string | undefined)[];
  targetAG: string;
  errorTitle: string;
}) => {
  const accountAGs = [...new Set(accountGroupingIds)];
  if (accountGroupingIds.length !== targetIds.length) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Not All ${errorTitle}  Found`,
    });
  }
  if (accountAGs.length > 1) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `All Targetted ${errorTitle} Must Have the same account grouping`,
    });
  }
  if (accountAGs[0] !== targetAG) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Account Grouping of ${errorTitle} doesn't match Transaction`,
    });
  }
};

const notUndefinedGuard = <T>(item: T | undefined): item is T => {
  return !!item;
};

const removeUndefined = <T>(item: (T | undefined)[]) => {
  return item.filter(notUndefinedGuard);
};

const removeUndefinedAndDuplicates = <T>(input: (T | undefined)[]) => {
  return [...new Set(removeUndefined(input))];
};

const makeToSet = (input: (string | undefined)[] | undefined) => {
  return input ? removeUndefinedAndDuplicates(input) : [];
};

export const checkLinkedItems = async ({
  accountGroupingId,
  accountIds,
  tagIds,
  billIds,
  budgetIds,
  categoryIds,
  client,
}: {
  accountGroupingId: string;
  accountIds?: (string | undefined)[];
  tagIds?: (string | undefined)[];
  billIds?: (string | undefined)[];
  budgetIds?: (string | undefined)[];
  categoryIds?: (string | undefined)[];
  client: PrismaClient | Prisma.TransactionClient;
}) => {
  const useAccountIds = makeToSet(accountIds);
  const useTagIds = makeToSet(tagIds);
  const useBillIds = makeToSet(billIds);
  const useBudgetIds = makeToSet(budgetIds);
  const useCategoryIds = makeToSet(categoryIds);

  if (useAccountIds && useAccountIds.length > 0) {
    const accounts = await client.transactionAccount.findMany({
      where: { id: { in: makeToSet(useAccountIds) } },
      select: { id: true, accountGroupingId: true },
    });
    checkItem({
      accountGroupingIds: accounts.map((item) => item.accountGroupingId),
      targetIds: useAccountIds,
      targetAG: accountGroupingId,
      errorTitle: "Account",
    });
  }
  if (useTagIds && useTagIds.length > 0) {
    const tags = await client.tag.findMany({
      where: { id: { in: makeToSet(useTagIds) } },
      select: { id: true, accountGroupingId: true },
    });
    checkItem({
      accountGroupingIds: tags.map((item) => item.accountGroupingId),
      targetIds: useTagIds,
      targetAG: accountGroupingId,
      errorTitle: "Tag",
    });
  }
  if (useBillIds && useBillIds.length > 0) {
    const bills = await client.bill.findMany({
      where: { id: { in: makeToSet(useBillIds) } },
      select: { id: true, accountGroupingId: true },
    });
    checkItem({
      accountGroupingIds: bills.map((item) => item.accountGroupingId),
      targetIds: useBillIds,
      targetAG: accountGroupingId,
      errorTitle: "Bill",
    });
  }
  if (useBudgetIds && useBudgetIds.length > 0) {
    const budgets = await client.budget.findMany({
      where: { id: { in: makeToSet(useBudgetIds) } },
      select: { id: true, accountGroupingId: true },
    });
    checkItem({
      accountGroupingIds: budgets.map((item) => item.accountGroupingId),
      targetIds: useBudgetIds,
      targetAG: accountGroupingId,
      errorTitle: "Budget",
    });
  }
  if (useCategoryIds && useCategoryIds.length > 0) {
    const categories = await client.category.findMany({
      where: { id: { in: makeToSet(useCategoryIds) } },
      select: { id: true, accountGroupingId: true },
    });
    checkItem({
      accountGroupingIds: categories.map((item) => item.accountGroupingId),
      targetIds: useCategoryIds,
      targetAG: accountGroupingId,
      errorTitle: "Category",
    });
  }
};

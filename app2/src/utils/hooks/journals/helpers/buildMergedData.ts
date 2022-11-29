import type {
  AccountGroupingReturnType,
  AccountsReturnType,
  BillsReturnType,
  BudgetsReturnType,
  CategoriesReturnType,
  JournalsReturnType,
  TagsReturnType,
} from "src/server/trpc/router/_app";

export const buildMergedData = ({
  input,
  bills,
  budgets,
  categories,
  tags,
  accounts,
  accountGroupings,
}: {
  input: JournalsReturnType[];
  bills: BillsReturnType[] | undefined;
  budgets: BudgetsReturnType[] | undefined;
  categories: CategoriesReturnType[] | undefined;
  tags: TagsReturnType[] | undefined;
  accounts: AccountsReturnType[] | undefined;
  accountGroupings: AccountGroupingReturnType[] | undefined;
}) => {
  return input.map((journal) => ({
    ...journal,
    bill: bills ? bills.find((item) => item.id === journal.billId) : undefined,
    budget: budgets
      ? budgets.find((item) => item.id === journal.budgetId)
      : undefined,
    category: categories
      ? categories.find((item) => item.id === journal.categoryId)
      : undefined,
    tag: tags ? tags.find((item) => item.id === journal.tagId) : undefined,
    account: accounts
      ? accounts.find((item) => item.id === journal.accountId)
      : undefined,
    accountGrouping: accountGroupings
      ? accountGroupings.find((item) => item.id === journal.accountGroupingId)
      : undefined,
  }));
};
export type MergedDataType = ReturnType<typeof buildMergedData>;

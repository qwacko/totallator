import { type BulkUpgradeAccountGroupingValidationType } from "src/utils/validation/accountGrouping/bulkUpgradeAccountGroupingValidation";

export const buildSearchIDList = ({
  data,
  key
}: {
  data: BulkUpgradeAccountGroupingValidationType;
  key: "accountId" | "billId" | "budgetId" | "categoryId" | "tagId";
}) => {
  const upsertList = data.upsertJournalEntries?.map((item) => item[key]) || [];
  const createSimpleListTo =
    data.createSimpleTransactions?.map(
      (item) => item[key === "accountId" ? "toAccountId" : key]
    ) || [];
  const createSimpleListFrom =
    data.createSimpleTransactions?.map(
      (item) => item[key === "accountId" ? "fromAccountId" : key]
    ) || [];
  const createTransactionsList = data.createTransactions
    ? data.createTransactions.reduce(
        (prev, current) => [...prev, ...current.map((item) => item[key])],
        [] as (string | undefined)[]
      )
    : [];

  return [
    ...upsertList,
    ...createSimpleListFrom,
    ...createSimpleListTo,
    ...createTransactionsList
  ];
};

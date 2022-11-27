import { useMemo } from "react";
import { trpc } from "src/utils/trpc";
import type { GetJournalValidation } from "src/utils/validation/journalEntries/getJournalValidation";
import { useAccountGroupings } from "../accountGroupings/useAccountGroupings";
import { useAccounts } from "../accounts/useAccounts";
import { useBills } from "../bills/useBills";
import { useBudgets } from "../budgets/useBudgets";
import { useCategories } from "../categories/useCategories";
import { useTags } from "../tags/useTags";

export const useJournals = (input: GetJournalValidation) => {
  const data = trpc.journals.get.useQuery(input);
  const billData = useBills();
  const budgetData = useBudgets();
  const tagData = useTags();
  const accountData = useAccounts();
  const accountGroupingData = useAccountGroupings();
  const categoryData = useCategories();

  const mergedData = useMemo(() => {
    if (data.data) {
      return data.data.map((journal) => ({
        ...journal,
        bill: billData.data
          ? billData.data.find((item) => item.id === journal.billId)
          : undefined,
        budget: budgetData.data
          ? budgetData.data.find((item) => item.id === journal.budgetId)
          : undefined,
        category: categoryData.data
          ? categoryData.data.find((item) => item.id === journal.categoryId)
          : undefined,
        tag: tagData.data
          ? tagData.data.find((item) => item.id === journal.tagId)
          : undefined,
        account: accountData.data
          ? accountData.data.find((item) => item.id === journal.accountId)
          : undefined,
        accountGroupingId: accountGroupingData.data
          ? accountGroupingData.data.find(
              (item) => item.id === journal.accountGroupingId
            )
          : undefined,
      }));
    }
    return [];
  }, [
    data.data,
    billData.data,
    budgetData.data,
    tagData.data,
    categoryData.data,
    accountData.data,
    accountGroupingData.data,
  ]);

  return { ...data, mergedData };
};

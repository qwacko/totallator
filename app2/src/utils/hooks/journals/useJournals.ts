import type {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { removeUndefined } from "src/utils/arrayHelpers";
import { trpc } from "src/utils/trpc";
import type {
  JournalFilterValidation,
  JournalSortValidation,
} from "src/utils/validation/journalEntries/getJournalValidation";
import { useAccountGroupings } from "../accountGroupings/useAccountGroupings";
import { useAccounts } from "../accounts/useAccounts";
import { useBills } from "../bills/useBills";
import { useBudgets } from "../budgets/useBudgets";
import { useCategories } from "../categories/useCategories";
import { useTags } from "../tags/useTags";

const sortingStateToPrismaSort = (
  input: SortingState
): JournalSortValidation => {
  const fixedSort: JournalSortValidation = [
    { key: "amount", direction: "desc" },
    { key: "updatedAt", direction: "desc" },
  ];

  const sorting: JournalSortValidation = removeUndefined(
    input.map((item) => {
      if (
        item.id === "updatedAt" ||
        item.id === "date" ||
        item.id === "description" ||
        item.id === "createdAt" ||
        item.id === "amount"
      ) {
        return { key: item.id, direction: item.desc ? "desc" : "asc" };
      }

      return undefined;
    })
  );

  return [...sorting, ...fixedSort];
};

const filtersToPrismaFilters = ({
  filters,
}: {
  filters: ColumnFiltersState;
}): JournalFilterValidation[] | undefined => {
  const processedFilters: JournalFilterValidation[] = removeUndefined(
    filters.map((item): JournalFilterValidation | undefined => {
      if (item.id === "description") {
        return { description: { contains: item.value as string } };
      }
      return undefined;
    })
  );
  return processedFilters;
};

export const useJournals = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [filters, setFilters] = useState<ColumnFiltersState>([]);

  const sortingToUse = sortingStateToPrismaSort(sorting);
  const filtersToUse = filtersToPrismaFilters({ filters });

  console.log("Filter To Use", filtersToUse);

  const data = trpc.journals.get.useQuery({
    sort: sortingToUse,
    pagination: { pageNo: pagination.pageIndex, pageSize: pagination.pageSize },
    filters: filtersToUse,
  });
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

  const pageCount = 5;

  return {
    data: { ...data, mergedData },
    tableState: {
      sorting,
      setSorting,
      filters,
      setFilters,
      pagination,
      setPagination,
      pageCount,
    },
  };
};

export type JournalsMergedType = ReturnType<
  typeof useJournals
>["data"]["mergedData"][0];

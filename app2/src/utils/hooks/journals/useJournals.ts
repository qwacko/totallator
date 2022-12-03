import type {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import { useState } from "react";
import { trpc } from "src/utils/trpc";
import { useAccountGroupings } from "../accountGroupings/useAccountGroupings";
import { useAccounts } from "../accounts/useAccounts";
import { useBills } from "../bills/useBills";
import { useBudgets } from "../budgets/useBudgets";
import { useCategories } from "../categories/useCategories";
import { useTags } from "../tags/useTags";
import { filtersToPrismaFilters } from "./helpers/filtersToPrismaFilters";
import { sortingStateToPrismaSort } from "./helpers/sortingStateToPrismaSort";
import {
  type MergedDataType,
  buildMergedData,
} from "./helpers/buildMergedData";
import { JournalFilterValidationInputType } from "src/utils/validation/journalEntries/getJournalValidation";

export const useJournals = ({
  externalFilters,
}: {
  externalFilters: JournalFilterValidationInputType[];
}) => {
  const [sorting, setSorting2] = useState<SortingState>([]);
  const setSorting = (data: SortingState) => {
    console.log("Updating useJournal Sorting", data);
    setSorting2(data);
  };
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [filters, setFilters] = useState<ColumnFiltersState>([]);
  const [rowCount, setRowCount] = useState<number>(0);

  const sortingToUse = sortingStateToPrismaSort(sorting);
  const filtersToUse = filtersToPrismaFilters({ filters });

  const billData = useBills();
  const budgetData = useBudgets();
  const tagData = useTags();
  const accountData = useAccounts();
  const accountGroupingData = useAccountGroupings();
  const categoryData = useCategories();

  const [mergedData, setMergedData] = useState<MergedDataType>([]);

  const data = trpc.journals.get.useQuery(
    {
      sort: sortingToUse,
      pagination: {
        pageNo: pagination.pageIndex,
        pageSize: pagination.pageSize,
      },
      filters: filtersToUse
        ? [...filtersToUse, ...externalFilters]
        : externalFilters,
    },
    {
      onSuccess: (data) => {
        setRowCount(data.count);
        setMergedData(
          buildMergedData({
            input: data.data,
            bills: billData.data,
            budgets: budgetData.data,
            tags: tagData.data,
            categories: categoryData.data,
            accounts: accountData.data,
            accountGroupings: accountGroupingData.data,
          })
        );
      },
    }
  );

  const pageCount = Math.max(Math.ceil(rowCount / pagination.pageSize), 1);

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

export type JournalsMergedType = MergedDataType[0];

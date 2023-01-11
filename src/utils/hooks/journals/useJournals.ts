import type {
  ColumnFiltersState,
  OnChangeFn,
  PaginationState,
  SortingState
} from "@tanstack/react-table";
import { useEffect, useState } from "react";

import { trpc } from "src/utils/trpc";
import type { JournalFilterValidationInputType } from "src/utils/validation/journalEntries/getJournalValidation";

import { useAccountGroupings } from "../accountGroupings/useAccountGroupings";
import { useAccounts } from "../accounts/useAccounts";
import { useBills } from "../bills/useBills";
import { useBudgets } from "../budgets/useBudgets";
import { useCategories } from "../categories/useCategories";
import { useTags } from "../tags/useTags";
import {
  type MergedDataType,
  buildMergedData
} from "./helpers/buildMergedData";
import { filtersToPrismaFilters } from "./helpers/filtersToPrismaFilters";
import { sortingStateToPrismaSort } from "./helpers/sortingStateToPrismaSort";

export const useJournals = ({
  externalFilters
}: {
  externalFilters: JournalFilterValidationInputType[];
}) => {
  const [sorting, setSorting2] = useState<SortingState>([]);
  const setSorting: OnChangeFn<SortingState> = (data) => {
    setSorting2(data);
  };
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });
  const [filters, setFilters] = useState<ColumnFiltersState>([]);
  const [rowCount, setRowCount] = useState<number>(0);

  const [rowSelection, setRowSelection] = useState({});
  const [mergedData, setMergedData] = useState<MergedDataType>([]);

  const sortingToUse = sortingStateToPrismaSort(sorting);
  const filtersToUse = filtersToPrismaFilters({ filters });

  const billData = useBills();
  const budgetData = useBudgets();
  const tagData = useTags();
  const accountData = useAccounts();
  const accountGroupingData = useAccountGroupings();
  const categoryData = useCategories();

  const data = trpc.journals.get.useQuery({
    sort: sortingToUse,
    pagination: {
      pageNo: pagination.pageIndex,
      pageSize: pagination.pageSize
    },
    filters: filtersToUse
      ? [...filtersToUse, ...externalFilters]
      : externalFilters
  });

  useEffect(() => {
    setRowCount(data.data ? data.data.count : 0);
    setMergedData(
      buildMergedData({
        input: data.data ? data.data.data : [],
        bills: billData.data,
        budgets: budgetData.data,
        tags: tagData.data,
        categories: categoryData.data,
        accounts: accountData.data,
        accountGroupings: accountGroupingData.data
      })
    );
  }, [
    data.data,
    accountData.data,
    categoryData.data,
    tagData.data,
    billData.data,
    budgetData.data,
    accountGroupingData.data
  ]);

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
      setRowSelection,
      rowSelection
    }
  };
};

export type JournalsMergedType = MergedDataType[0];

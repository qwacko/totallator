import { atom } from "jotai";

import type {
  GetJournalValidationInput,
  JournalFilterValidationInputType
} from "src/utils/validation/journalEntries/getJournalValidation";

import {
  type TableFilterType,
  tableFilterAtom
} from "../table/useTableFilterAtom";
import { type TableSortType, tableSortAtom } from "../table/useTableSortAtom";
import { filtersToPrismaFilters } from "./helpers/filtersToPrismaFilters";
import { sortingStateToPrismaSort } from "./helpers/sortingStateToPrismaSort";

type JournalTableConfigPaginationType = {
  pageIndex: number;
  pageSize: number;
  rowCount: number;
};

type JournalSortKeys =
  | "account"
  | "tag"
  | "category"
  | "bill"
  | "budget"
  | "date"
  | "description"
  | "amount";

type JournalFilterKeys =
  | "accountId"
  | "tagId"
  | "description"
  | "date"
  | "billId"
  | "budgetId"
  | "categoryId";

export const journalTableConfigAtom = ({
  initialSort,
  initialFilter
}: {
  initialSort?: TableSortType<JournalSortKeys>[];
  initialFilter?: TableFilterType<JournalFilterKeys>[];
} = {}) => {
  const sortingAtom = tableSortAtom<JournalSortKeys>(initialSort);
  const filtersAtom = tableFilterAtom<JournalFilterKeys>(initialFilter);
  const paginationAtom = atom<JournalTableConfigPaginationType>({
    pageIndex: 0,
    pageSize: 10,
    rowCount: 0
  });
  const editingRowsAtom = atom<string[]>([]);
  const editingByIdAtom = (id: string) =>
    atom(
      (get) => get(editingRowsAtom).includes(id),
      (get, set) => {
        const currentEditing = get(editingRowsAtom);
        if (currentEditing.includes(id)) {
          set(
            editingRowsAtom,
            currentEditing.filter((item) => item !== id)
          );
        } else {
          set(editingRowsAtom, [...currentEditing, id]);
        }
      }
    );

  const configForTRPC = (externalFilters: JournalFilterValidationInputType[]) =>
    atom((get) => {
      const sortingToUse = sortingStateToPrismaSort(get(sortingAtom) || []);
      const filtersToUse = filtersToPrismaFilters({
        filters: get(filtersAtom) || []
      });
      console.log("TRPC Filters", filtersToUse);

      const combinedFilters = filtersToUse
        ? [...filtersToUse, ...externalFilters]
        : externalFilters;

      const pagination = get(paginationAtom);

      const returnData: GetJournalValidationInput = {
        sort: sortingToUse,
        pagination: {
          pageNo: pagination.pageIndex,
          pageSize: pagination.pageSize
        },
        filters: combinedFilters
      };
      return returnData;
    });

  return {
    sortingAtom,
    filtersAtom,
    paginationAtom,
    editingRowsAtom,
    editingByIdAtom,
    configForTRPC
  };
};

export type JournalTableConfigAtomReturn = ReturnType<
  typeof journalTableConfigAtom
>;

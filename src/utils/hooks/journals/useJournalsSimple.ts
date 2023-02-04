import { atom } from "jotai";

import { paginationAtomGenerator } from "src/components/tableAtom/AtomPagination";
import type {
  GetJournalValidationInput,
  JournalFilterValidationInputType
} from "src/utils/validation/journalEntries/getJournalValidation";

import {
  type TableFilterType,
  tableFilterAtom
} from "../table/useTableFilterAtom";
import { type TableSortType, tableSortAtom } from "../table/useTableSortAtom";
import { journalsFiltersToPrismaFilters } from "./helpers/filtersToPrismaFilters";
import { sortingStateToPrismaSort } from "./helpers/sortingStateToPrismaSort";
import { idSelectionAtom } from "./idSelectionAtom";

export type JournalSortKeys =
  | "account"
  | "tag"
  | "category"
  | "bill"
  | "budget"
  | "date"
  | "description"
  | "amount"
  | "updatedAt"
  | "createdAt";

type JournalFilterKeys =
  | "accountId"
  | "tagId"
  | "description"
  | "date"
  | "billId"
  | "budgetId"
  | "categoryId"
  | "payee";

export const journalTableConfigAtom = ({
  initialSort,
  initialFilter
}: {
  initialSort?: TableSortType<JournalSortKeys>[];
  initialFilter?: TableFilterType<JournalFilterKeys>[];
} = {}) => {
  const sortingAtom = tableSortAtom<JournalSortKeys>(initialSort);
  const filtersAtom = tableFilterAtom<JournalFilterKeys>(initialFilter);
  const paginationAtom = paginationAtomGenerator(10);
  const { selectionAtom: editingRowsAtom, selectionAtomById: editingByIdAtom } =
    idSelectionAtom();

  const {
    selectionAtom: selectedRowsAtom,
    selectionAtomById: selectedByIdAtom
  } = idSelectionAtom();

  const configForTRPC = (externalFilters: JournalFilterValidationInputType[]) =>
    atom((get) => {
      const sortingToUse = sortingStateToPrismaSort(get(sortingAtom) || []);
      const filtersToUse = journalsFiltersToPrismaFilters({
        filters: get(filtersAtom) || []
      });

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
    paginationAtom: paginationAtom,
    editingRowsAtom,
    editingByIdAtom,
    selectedRowsAtom,
    selectedByIdAtom,
    configForTRPC
  };
};

export type JournalTableConfigAtomReturn = ReturnType<
  typeof journalTableConfigAtom
>;

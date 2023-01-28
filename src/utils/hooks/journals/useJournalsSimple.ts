import deepEquals from "fast-deep-equal";
import { atom } from "jotai";
import { selectAtom } from "jotai/utils";

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
  | "categoryId"
  | "payee";

const idSelectionAtom = () => {
  const selectionAtom = atom<string[]>([]);

  const selectionAtomById = (id: string) => {
    const isSelectedAtom = selectAtom(
      selectionAtom,
      (data) => data.includes(id),
      deepEquals
    );

    return atom(
      (get) => get(isSelectedAtom),
      (get, set) => {
        const currentEditing = get(selectionAtom);
        if (currentEditing.includes(id)) {
          set(
            selectionAtom,
            currentEditing.filter((item) => item !== id)
          );
        } else {
          set(selectionAtom, [...currentEditing, id]);
        }
      }
    );
  };

  return { selectionAtom, selectionAtomById };
};

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
  const { selectionAtom: editingRowsAtom, selectionAtomById: editingByIdAtom } =
    idSelectionAtom();

  const {
    selectionAtom: selectedRowsAtom,
    selectionAtomById: selectedByIdAtom
  } = idSelectionAtom();

  const configForTRPC = (externalFilters: JournalFilterValidationInputType[]) =>
    atom((get) => {
      const sortingToUse = sortingStateToPrismaSort(get(sortingAtom) || []);
      const filtersToUse = filtersToPrismaFilters({
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
    paginationAtom,
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

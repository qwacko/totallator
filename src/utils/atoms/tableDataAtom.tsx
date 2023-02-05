import { atom } from "jotai";

import { paginationAtomGenerator } from "src/components/tableAtom/AtomPagination";
import { idSelectAtom } from "src/utils/atoms/idSelectAtom";
import { type TableSortType } from "src/utils/hooks/table/useTableSortAtom";

import { idSelectionAtom } from "../hooks/journals/idSelectionAtom";
import {
  type TableFilterType,
  tableFilterAtom
} from "../hooks/table/useTableFilterAtom";
import { tableSortAtom } from "../hooks/table/useTableSortAtom";
import { TRPCQueryAtom } from "./TRPCQueryAtom";

export const tableDataAtom = <
  FilterKeys extends string,
  SortKeys extends string,
  DataType extends { id: string },
  FilterReturnType extends Record<string, unknown>
>({
  sortProcessing,
  filterProcessing
}: {
  sortProcessing: (data: TableSortType<SortKeys>[]) => {
    key: SortKeys;
    direction: "asc" | "desc";
  }[];
  filterProcessing: (data: {
    filters: TableFilterType<FilterKeys>[];
  }) => FilterReturnType[] | undefined;
}) => {
  const pagination = paginationAtomGenerator();
  const filter = tableFilterAtom<FilterKeys>();
  const sort = tableSortAtom<SortKeys>();
  const data = atom<DataType[]>([]);
  const selection = idSelectionAtom();

  const displayIds = idSelectAtom(data);

  const configForTRPC = TRPCQueryAtom({
    filter,
    pagination,
    sort,
    sortProcessing,
    filterProcessing,
    paginationOffset: 0
  });

  const configForTRPCNext = TRPCQueryAtom({
    filter,
    pagination,
    sort,
    sortProcessing,
    filterProcessing,
    paginationOffset: 1
  });

  const configForTRPCPrev = TRPCQueryAtom({
    filter,
    pagination,
    sort,
    sortProcessing,
    filterProcessing,
    paginationOffset: -1
  });

  return {
    pagination,
    filter,
    sort,
    displayIds,
    data,
    configForTRPC,
    configForTRPCNext,
    configForTRPCPrev,
    ...selection
  };
};

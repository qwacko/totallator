import { type PrimitiveAtom, atom } from "jotai";

import { type TablePaginationType } from "src/components/tableAtom/AtomPagination";

import { type TableSortType } from "../hooks/table/useTableSortAtom";

export const TRPCQueryAtom = <
  FilterType extends Record<string, unknown>[],
  SortType extends string,
  FilterReturnType extends Record<string, unknown>
>({
  filter,
  pagination,
  sort,
  sortProcessing,
  filterProcessing,
  paginationOffset = 0
}: {
  paginationOffset?: number;
  filter: PrimitiveAtom<FilterType>;
  pagination: PrimitiveAtom<TablePaginationType>;
  sort: PrimitiveAtom<TableSortType<SortType>[]>;
  sortProcessing: (
    data: TableSortType<SortType>[]
  ) => { key: SortType; direction: "asc" | "desc" }[];
  filterProcessing: (data: {
    filters: FilterType;
  }) => FilterReturnType[] | undefined;
}) =>
  atom((get) => {
    const sortingToUse = sortProcessing(get(sort) || []);
    const filtersToUse = filterProcessing({
      filters: get(filter) || []
    });

    const paginationData = get(pagination);

    const returnData = {
      sort: sortingToUse,
      pagination: {
        pageNo: Math.max(paginationData.pageIndex + paginationOffset, 0),
        pageSize: paginationData.pageSize
      },
      filters: filtersToUse
    };
    return returnData;
  });

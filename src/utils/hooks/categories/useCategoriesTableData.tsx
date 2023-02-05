import { useMemo } from "react";

import { type RouterOutputs } from "src/utils/trpc";
import type {
  CategoryFilterInputValidation,
  CategoryFilterValidation
} from "src/utils/validation/category/categoryFilter";
import type { CategorySortValidation } from "src/utils/validation/category/categorySort";

import { tableDataAtom } from "../../atoms/tableDataAtom";
import { categoryFiltersToPrismaFilters } from "./categoryFiltersToPrismaFilters";
import { categorySortingStateToPrismaSort } from "./categorySortingStateToPrismaSort";

export type CategorySortKeys = NonNullable<CategorySortValidation>[0]["key"];

export type CategoryFilterKeys = keyof CategoryFilterValidation;

export const useCategoriesTableData = () => {
  return useMemo(
    () =>
      tableDataAtom<
        CategoryFilterKeys,
        CategorySortKeys,
        RouterOutputs["categories"]["get"]["data"][0],
        CategoryFilterInputValidation
      >({
        sortProcessing: categorySortingStateToPrismaSort,
        filterProcessing: categoryFiltersToPrismaFilters
      }),

    []
  );
};

export type CategoriesTableDataType = ReturnType<typeof useCategoriesTableData>;

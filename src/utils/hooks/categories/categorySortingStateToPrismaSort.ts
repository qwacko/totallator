import { removeUndefined } from "src/utils/arrayHelpers";
import type { CategorySortValidation } from "src/utils/validation/category/categorySort";

import type { TableSortType } from "../table/useTableSortAtom";
import type { CategorySortKeys } from "./useCategoriesTableData";

export const categorySortingStateToPrismaSort = (
  input: TableSortType<CategorySortKeys>[]
): NonNullable<CategorySortValidation> => {
  const fixedSort: NonNullable<CategorySortValidation> = [
    { key: "title", direction: "asc" },
    { key: "updatedAt", direction: "desc" }
  ];

  const sorting: NonNullable<CategorySortValidation> = removeUndefined(
    input.map((item) => {
      return { key: item.id, direction: item.desc ? "desc" : "asc" };
    })
  );

  return [...sorting, ...fixedSort];
};

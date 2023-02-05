import { removeUndefined } from "src/utils/arrayHelpers";
import type { BudgetSortValidation } from "src/utils/validation/budget/budgetSort";

import type { TableSortType } from "../table/useTableSortAtom";
import type { BudgetSortKeys } from "./useBudgetsTableData";

export const budgetSortingStateToPrismaSort = (
  input: TableSortType<BudgetSortKeys>[]
): NonNullable<BudgetSortValidation> => {
  const fixedSort: NonNullable<BudgetSortValidation> = [
    { key: "title", direction: "asc" },
    { key: "updatedAt", direction: "desc" }
  ];

  const sorting: NonNullable<BudgetSortValidation> = removeUndefined(
    input.map((item) => {
      return { key: item.id, direction: item.desc ? "desc" : "asc" };
    })
  );

  return [...sorting, ...fixedSort];
};

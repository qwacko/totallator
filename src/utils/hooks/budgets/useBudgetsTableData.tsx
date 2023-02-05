import { useMemo } from "react";

import { type RouterOutputs } from "src/utils/trpc";
import type {
  BudgetFilterInputValidation,
  BudgetFilterValidation
} from "src/utils/validation/budget/budgetFilter";
import type { BudgetSortValidation } from "src/utils/validation/budget/budgetSort";

import { tableDataAtom } from "../../atoms/tableDataAtom";
import { budgetFiltersToPrismaFilters } from "./budgetFiltersToPrismaFilters";
import { budgetSortingStateToPrismaSort } from "./budgetSortingStateToPrismaSort";

export type BudgetSortKeys = NonNullable<BudgetSortValidation>[0]["key"];

export type BudgetFilterKeys = keyof BudgetFilterValidation;

export const useBudgetsTableData = () => {
  return useMemo(
    () =>
      tableDataAtom<
        BudgetFilterKeys,
        BudgetSortKeys,
        RouterOutputs["budgets"]["get"]["data"][0],
        BudgetFilterInputValidation
      >({
        sortProcessing: budgetSortingStateToPrismaSort,
        filterProcessing: budgetFiltersToPrismaFilters
      }),

    []
  );
};

export type BudgetsTableDataType = ReturnType<typeof useBudgetsTableData>;

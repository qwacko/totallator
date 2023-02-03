import { dateRangeFilterToObject } from "src/components/tableAtom/TableFilterDateRangeInput";
import { removeUndefined } from "src/utils/arrayHelpers";
import type { BudgetFilterInputValidation } from "src/utils/validation/budget/budgetFilter";

import type { TableFilterType } from "../table/useTableFilterAtom";
import type { BudgetFilterKeys } from "./useBudgetsTableData";

export const budgetFiltersToPrismaFilters = ({
  filters
}: {
  filters: TableFilterType<BudgetFilterKeys>[];
}): BudgetFilterInputValidation[] | undefined => {
  const processedFilters: BudgetFilterInputValidation[] = removeUndefined(
    filters.map((item): BudgetFilterInputValidation | undefined => {
      if (item.id === "title") {
        const stringValue = item.value;
        if (item.value.length > 0) {
          return { [item.id]: { contains: stringValue } };
        }
      }
      if (item.id === "createdAt" || item.id === "updatedAt") {
        return { [item.id]: dateRangeFilterToObject(item.value) };
      }
      if (
        item.id === "active" ||
        item.id === "allowUpdate" ||
        item.id === "deleted" ||
        item.id === "disabled"
      ) {
        return { [item.id]: { equals: item.value === "T" } };
      }

      return undefined;
    })
  );
  return processedFilters;
};

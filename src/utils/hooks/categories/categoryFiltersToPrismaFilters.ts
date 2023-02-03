import { dateRangeFilterToObject } from "src/components/tableAtom/TableFilterDateRangeInput";
import { removeUndefined } from "src/utils/arrayHelpers";
import type { CategoryFilterInputValidation } from "src/utils/validation/category/categoryFilter";

import type { TableFilterType } from "../table/useTableFilterAtom";
import type { CategoryFilterKeys } from "./useCategoriesTableData";

export const categoryFiltersToPrismaFilters = ({
  filters
}: {
  filters: TableFilterType<CategoryFilterKeys>[];
}): CategoryFilterInputValidation[] | undefined => {
  const processedFilters: CategoryFilterInputValidation[] = removeUndefined(
    filters.map((item): CategoryFilterInputValidation | undefined => {
      if (item.id === "title" || item.id === "group" || item.id === "single") {
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

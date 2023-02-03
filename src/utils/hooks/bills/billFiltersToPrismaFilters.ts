import { dateRangeFilterToObject } from "src/components/tableAtom/TableFilterDateRangeInput";
import { removeUndefined } from "src/utils/arrayHelpers";
import type { BillFilterInputValidation } from "src/utils/validation/bill/billFilter";

import type { TableFilterType } from "../table/useTableFilterAtom";
import type { BillFilterKeys } from "./useBillsTableData";

export const billFiltersToPrismaFilters = ({
  filters
}: {
  filters: TableFilterType<BillFilterKeys>[];
}): BillFilterInputValidation[] | undefined => {
  const processedFilters: BillFilterInputValidation[] = removeUndefined(
    filters.map((item): BillFilterInputValidation | undefined => {
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

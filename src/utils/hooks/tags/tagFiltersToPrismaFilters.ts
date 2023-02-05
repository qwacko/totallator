import { dateRangeFilterToObject } from "src/components/tableAtom/TableFilterDateRangeInput";
import { removeUndefined } from "src/utils/arrayHelpers";
import type { TagFilterInputValidation } from "src/utils/validation/tag/tagFilter";

import type { TableFilterType } from "../table/useTableFilterAtom";
import type { TagFilterKeys } from "./useTagsTableData";

export const tagFiltersToPrismaFilters = ({
  filters
}: {
  filters: TableFilterType<TagFilterKeys>[];
}): TagFilterInputValidation[] | undefined => {
  const processedFilters: TagFilterInputValidation[] = removeUndefined(
    filters.map((item): TagFilterInputValidation | undefined => {
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

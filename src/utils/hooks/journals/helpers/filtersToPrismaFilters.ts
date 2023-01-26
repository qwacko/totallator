import { removeUndefined } from "src/utils/arrayHelpers";
import type { JournalFilterValidationInputType } from "src/utils/validation/journalEntries/getJournalValidation";

import { type TableFilterType } from "../../table/useTableFilterAtom";

export const filtersToPrismaFilters = <T extends string>({
  filters
}: {
  filters: TableFilterType<T>[];
}): JournalFilterValidationInputType[] | undefined => {
  const processedFilters: JournalFilterValidationInputType[] = removeUndefined(
    filters.map((item): JournalFilterValidationInputType | undefined => {
      if (item.id === "description") {
        return { description: { contains: item.value as string } };
      }
      if (item.id === "date" && item.value) {
        return { date: item.value as { gte?: Date; lte?: Date } };
      }
      if (item.id === "accountId" && item.value) {
        return { account: { title: { contains: item.value } } };
      }
      if (item.id === "billId" && item.value) {
        return { bill: { title: { contains: item.value } } };
      }
      if (item.id === "budgetId" && item.value) {
        return { budget: { title: { contains: item.value } } };
      }
      if (item.id === "categoryId" && item.value) {
        return { category: { title: { contains: item.value } } };
      }
      if (item.id === "tagId" && item.value) {
        return { tag: { title: { contains: item.value } } };
      }
      return undefined;
    })
  );
  return processedFilters;
};

import type { ColumnFiltersState } from "@tanstack/react-table";
import { removeUndefined } from "src/utils/arrayHelpers";
import type { JournalFilterValidationInputType } from "src/utils/validation/journalEntries/getJournalValidation";

export const filtersToPrismaFilters = ({
  filters,
}: {
  filters: ColumnFiltersState;
}): JournalFilterValidationInputType[] | undefined => {
  console.log("Column Filters", filters);

  const processedFilters: JournalFilterValidationInputType[] = removeUndefined(
    filters.map((item): JournalFilterValidationInputType | undefined => {
      if (item.id === "description") {
        return { description: { contains: item.value as string } };
      }
      if (item.id === "date" && item.value) {
        return { date: item.value as { gte?: Date; lte?: Date } };
      }
      return undefined;
    })
  );
  return processedFilters;
};

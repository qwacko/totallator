import type { ColumnFiltersState } from "@tanstack/react-table";
import { removeUndefined } from "src/utils/arrayHelpers";
import type { JournalFilterValidationInputType } from "src/utils/validation/journalEntries/getJournalValidation";

export const filtersToPrismaFilters = ({
  filters,
}: {
  filters: ColumnFiltersState;
}): JournalFilterValidationInputType[] | undefined => {
  const processedFilters: JournalFilterValidationInputType[] = removeUndefined(
    filters.map((item): JournalFilterValidationInputType | undefined => {
      if (item.id === "description") {
        return { description: { contains: item.value as string } };
      }
      return undefined;
    })
  );
  return processedFilters;
};

import type { SortingState } from "@tanstack/react-table";
import { removeUndefined } from "src/utils/arrayHelpers";
import type { JournalSortValidation } from "src/utils/validation/journalEntries/getJournalValidation";

export const sortingStateToPrismaSort = (
  input: SortingState
): JournalSortValidation => {
  const fixedSort: JournalSortValidation = [
    { key: "amount", direction: "desc" },
    { key: "updatedAt", direction: "desc" },
  ];

  const sorting: JournalSortValidation = removeUndefined(
    input.map((item) => {
      if (
        item.id === "updatedAt" ||
        item.id === "date" ||
        item.id === "description" ||
        item.id === "createdAt" ||
        item.id === "amount"
      ) {
        return { key: item.id, direction: item.desc ? "desc" : "asc" };
      }

      return undefined;
    })
  );

  return [...sorting, ...fixedSort];
};

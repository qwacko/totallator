import type { Prisma } from "@prisma/client";
import { type JournalSortValidation } from "src/utils/validation/journalEntries/getJournalValidation";

export const sortToOrderBy = (
  input: JournalSortValidation
): Prisma.JournalEntryOrderByWithAggregationInput[] | undefined => {
  if (!input) {
    return undefined;
  }

  return input.map((sort) => {
    if (sort.key === "date") {
      return { date: sort.direction };
    }
    if (sort.key === "description") {
      return { description: sort.direction };
    }
    if (sort.key === "createdAt") {
      return { createdAt: sort.direction };
    }
    if (sort.key === "updatedAt") {
      return { updatedAt: sort.direction };
    }
    if (sort.key === "amount") {
      return { amount: sort.direction };
    }

    return {};
  });
};

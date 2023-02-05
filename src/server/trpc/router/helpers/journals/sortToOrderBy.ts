import type { Prisma } from "@prisma/client";

import { type JournalSortValidation } from "src/utils/validation/journalEntries/getJournalValidation";

export const journalSortToOrderBy = (
  input: JournalSortValidation
):
  | Prisma.Enumerable<Prisma.JournalEntryOrderByWithRelationAndSearchRelevanceInput>
  | undefined => {
  if (!input) {
    return [
      { date: "desc" },
      { amount: "desc" },
      { createdAt: "desc" },
      { id: "asc" }
    ];
  }

  const returnData = input.map(
    (sort): Prisma.JournalEntryOrderByWithRelationAndSearchRelevanceInput => {
      if (sort.key === "account") {
        return { account: { title: sort.direction } };
      }
      if (sort.key === "bill") {
        return { bill: { title: sort.direction } };
      }
      if (sort.key === "budget") {
        return { budget: { title: sort.direction } };
      }
      if (sort.key === "category") {
        return { category: { title: sort.direction } };
      }
      if (sort.key === "tag") {
        return { tag: { title: sort.direction } };
      }
      return { [sort.key]: sort.direction };
    }
  );

  return [...returnData, { id: "asc" }];
};

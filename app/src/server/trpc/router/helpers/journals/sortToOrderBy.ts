import type { Prisma } from "@prisma/client";
import { type JournalSortValidation } from "src/utils/validation/journalEntries/getJournalValidation";

export const sortToOrderBy = (
  input: JournalSortValidation
):
  | Prisma.Enumerable<Prisma.JournalEntryOrderByWithRelationAndSearchRelevanceInput>
  | undefined => {
  if (!input) {
    return [
      { date: "desc" },
      { amount: "desc" },
      { createdAt: "desc" },
      { id: "asc" },
    ];
  }

  const returnData = input.map(
    (sort): Prisma.JournalEntryOrderByWithRelationAndSearchRelevanceInput => {
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

      return {};
    }
  );

  return [
    ...returnData,
    { date: "desc" },
    { amount: "desc" },
    { createdAt: "desc" },
    { id: "asc" },
  ];
};

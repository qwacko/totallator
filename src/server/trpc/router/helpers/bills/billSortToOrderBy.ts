import type { Prisma } from "@prisma/client";

import type { BillSortValidation } from "src/utils/validation/bill/billSort";

export const billSortToOrderBy = (
  input: BillSortValidation
):
  | Prisma.Enumerable<Prisma.BillOrderByWithRelationAndSearchRelevanceInput>
  | undefined => {
  if (!input) {
    return [{ title: "desc" }, { createdAt: "desc" }, { id: "asc" }];
  }

  const returnData = input.map(
    (sort): Prisma.BillOrderByWithRelationAndSearchRelevanceInput => {
      return { [sort.key]: sort.direction };
    }
  );

  return [...returnData, { id: "asc" }];
};

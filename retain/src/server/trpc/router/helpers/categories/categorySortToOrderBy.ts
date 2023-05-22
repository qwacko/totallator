import type { Prisma } from "@prisma/client";

import type { CategorySortValidation } from "src/utils/validation/category/categorySort";

export const categorySortToOrderBy = (
  input: CategorySortValidation
):
  | Prisma.Enumerable<Prisma.CategoryOrderByWithRelationAndSearchRelevanceInput>
  | undefined => {
  if (!input) {
    return [{ title: "desc" }, { createdAt: "desc" }, { id: "asc" }];
  }

  const returnData = input.map(
    (sort): Prisma.CategoryOrderByWithRelationAndSearchRelevanceInput => {
      return { [sort.key]: sort.direction };
    }
  );

  return [...returnData, { id: "asc" }];
};

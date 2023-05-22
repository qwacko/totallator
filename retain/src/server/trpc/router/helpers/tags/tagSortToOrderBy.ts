import type { Prisma } from "@prisma/client";

import type { TagSortValidation } from "src/utils/validation/tag/tagSort";

export const tagSortToOrderBy = (
  input: TagSortValidation
):
  | Prisma.Enumerable<Prisma.TagOrderByWithRelationAndSearchRelevanceInput>
  | undefined => {
  if (!input) {
    return [{ title: "desc" }, { createdAt: "desc" }, { id: "asc" }];
  }

  const returnData = input.map(
    (sort): Prisma.TagOrderByWithRelationAndSearchRelevanceInput => {
      return { [sort.key]: sort.direction };
    }
  );

  return [...returnData, { id: "asc" }];
};

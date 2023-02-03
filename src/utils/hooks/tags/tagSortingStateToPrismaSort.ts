import { removeUndefined } from "src/utils/arrayHelpers";
import type { TagSortValidation } from "src/utils/validation/tag/tagSort";

import type { TableSortType } from "../table/useTableSortAtom";
import type { TagSortKeys } from "./useTagsTableData";

export const tagSortingStateToPrismaSort = (
  input: TableSortType<TagSortKeys>[]
): NonNullable<TagSortValidation> => {
  const fixedSort: NonNullable<TagSortValidation> = [
    { key: "title", direction: "asc" },
    { key: "updatedAt", direction: "desc" }
  ];

  const sorting: NonNullable<TagSortValidation> = removeUndefined(
    input.map((item) => {
      return { key: item.id, direction: item.desc ? "desc" : "asc" };
    })
  );

  return [...sorting, ...fixedSort];
};

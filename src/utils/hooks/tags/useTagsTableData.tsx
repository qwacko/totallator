import { useMemo } from "react";

import { type RouterOutputs } from "src/utils/trpc";
import type {
  TagFilterInputValidation,
  TagFilterValidation
} from "src/utils/validation/tag/tagFilter";
import type { TagSortValidation } from "src/utils/validation/tag/tagSort";

import { tableDataAtom } from "../../atoms/tableDataAtom";
import { tagFiltersToPrismaFilters } from "./tagFiltersToPrismaFilters";
import { tagSortingStateToPrismaSort } from "./tagSortingStateToPrismaSort";

export type TagSortKeys = NonNullable<TagSortValidation>[0]["key"];

export type TagFilterKeys = keyof TagFilterValidation;

export const useTagsTableData = () => {
  return useMemo(
    () =>
      tableDataAtom<
        TagFilterKeys,
        TagSortKeys,
        RouterOutputs["tags"]["get"]["data"][0],
        TagFilterInputValidation
      >({
        sortProcessing: tagSortingStateToPrismaSort,
        filterProcessing: tagFiltersToPrismaFilters
      }),

    []
  );
};

export type TagsTableDataType = ReturnType<typeof useTagsTableData>;

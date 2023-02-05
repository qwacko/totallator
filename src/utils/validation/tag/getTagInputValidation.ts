import { z } from "zod";

import { paginationValidation } from "../journalEntries/paginationValidation";
import { tagFilter } from "./tagFilter";
import { tagSort } from "./tagSort";

export const getTagInputValidation = z.object({
  pagination: paginationValidation
    .optional()
    .default({ pageNo: 0, pageSize: 10 }),
  filters: z.array(tagFilter).optional(),
  sort: tagSort
});

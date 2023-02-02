import { z } from "zod";

import { paginationValidation } from "../journalEntries/paginationValidation";
import { billFilter } from "./billFilter";
import { billSort } from "./billSort";

export const getBillInputValidation = z.object({
  pagination: paginationValidation
    .optional()
    .default({ pageNo: 0, pageSize: 10 }),
  filters: z.array(billFilter).optional(),
  sort: billSort
});

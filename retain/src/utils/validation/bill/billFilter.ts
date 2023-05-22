import { z } from "zod";

import { statusFilter } from "../account/statusFilter";
import { booleanFilter } from "../journalEntries/booleanFilter";
import { dateFilter } from "../journalEntries/dateFilter";
import { idFilter } from "../journalEntries/idFilter";
import { stringFilter } from "../journalEntries/stringFilter";

export const billFilter = z.object({
  id: idFilter,
  title: stringFilter,
  updatedAt: dateFilter,
  createdAt: dateFilter,
  status: statusFilter,
  deleted: booleanFilter,
  allowUpdate: booleanFilter,
  active: booleanFilter,
  disabled: booleanFilter
});

export type BillFilterValidation = z.infer<typeof billFilter>;
export type BillFilterInputValidation = z.input<typeof billFilter>;

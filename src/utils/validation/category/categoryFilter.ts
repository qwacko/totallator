import { z } from "zod";

import { statusFilter } from "../account/statusFilter";
import { booleanFilter } from "../journalEntries/booleanFilter";
import { dateFilter } from "../journalEntries/dateFilter";
import { idFilter } from "../journalEntries/idFilter";
import { stringFilter } from "../journalEntries/stringFilter";

export const categoryFilter = z.object({
  id: idFilter,
  title: stringFilter,
  group: stringFilter,
  single: stringFilter,
  updatedAt: dateFilter,
  createdAt: dateFilter,
  status: statusFilter,
  deleted: booleanFilter,
  allowUpdate: booleanFilter,
  active: booleanFilter,
  disabled: booleanFilter
});

export type CategoryFilterValidation = z.infer<typeof categoryFilter>;
export type CategoryFilterInputValidation = z.input<typeof categoryFilter>;

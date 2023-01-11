import { z } from "zod";

import {
  accountGroupingIdValidation,
  createdUpdatedValidation,
  journalCountValidation,
  statusReturnValidation,
  userIsAdminValidation
} from "../returnValidationHelpers";

export const billSingleValidation = z
  .object({
    id: z.string().cuid(),
    title: z.string()
  })
  .merge(statusReturnValidation)
  .merge(createdUpdatedValidation)
  .merge(accountGroupingIdValidation);

export type billSingleValidationType = z.infer<typeof billSingleValidation>;

export const billGetValidation = z.array(
  billSingleValidation
    .merge(journalCountValidation)
    .merge(userIsAdminValidation)
    .strict()
);

export type BillGetValidationType = z.infer<typeof billGetValidation>;

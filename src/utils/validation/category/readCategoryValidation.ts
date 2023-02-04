import { z } from "zod";

import {
  accountGroupingIdValidation,
  createdUpdatedValidation,
  journalCountValidation,
  statusReturnValidation,
  userIsAdminValidation
} from "../returnValidationHelpers";

export const categorySingleValidation = z
  .object({
    id: z.string().cuid(),
    title: z.string(),
    group: z.string(),
    single: z.string()
  })
  .merge(statusReturnValidation)
  .merge(createdUpdatedValidation)
  .merge(accountGroupingIdValidation);

export type categorySingleValidationType = z.infer<
  typeof categorySingleValidation
>;

const categoryGetValidation = z.array(
  categorySingleValidation
    .merge(journalCountValidation)
    .merge(userIsAdminValidation)
    .strict()
);

export type CategoryGetValidationType = z.infer<typeof categoryGetValidation>;

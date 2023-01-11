import { z } from "zod";

import {
  accountGroupingIdValidation,
  createdUpdatedValidation,
  journalCountValidation,
  statusReturnValidation,
  userIsAdminValidation
} from "../returnValidationHelpers";

export const tagSingleValidation = z
  .object({
    id: z.string().cuid(),
    title: z.string(),
    group: z.string(),
    single: z.string()
  })
  .merge(statusReturnValidation)
  .merge(createdUpdatedValidation)
  .merge(accountGroupingIdValidation);

export type tagSingleValidationType = z.infer<typeof tagSingleValidation>;

export const tagGetValidation = z.array(
  tagSingleValidation
    .merge(journalCountValidation)
    .merge(userIsAdminValidation)
    .strict()
);

export type TagGetValidationType = z.infer<typeof tagGetValidation>;

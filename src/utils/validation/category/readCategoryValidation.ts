import { z } from "zod";
import {
  statusReturnValidation,
  createdUpdatedValidation,
  accountGroupingIdValidation,
  journalCountValidation,
  userIsAdminValidation,
} from "../returnValidationHelpers";

export const categorySingleValidation = z
  .object({
    id: z.string().cuid(),
    title: z.string(),
    group: z.string(),
    single: z.string(),
  })
  .merge(statusReturnValidation)
  .merge(createdUpdatedValidation)
  .merge(accountGroupingIdValidation);

export type categorySingleValidationType = z.infer<
  typeof categorySingleValidation
>;

export const categoryGetValidation = z.array(
  categorySingleValidation
    .merge(journalCountValidation)
    .merge(userIsAdminValidation)
    .strict()
);

export type CategoryGetValidationType = z.infer<typeof categoryGetValidation>;

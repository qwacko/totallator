import { z } from "zod";
import {
  statusReturnValidation,
  createdUpdatedValidation,
  accountGroupingIdValidation,
  journalCountValidation,
  userIsAdminValidation,
} from "../returnValidationHelpers";

export const budgetSingleValidation = z
  .object({
    id: z.string().cuid(),
    title: z.string(),
  })
  .merge(statusReturnValidation)
  .merge(createdUpdatedValidation)
  .merge(accountGroupingIdValidation);

export type budgetSingleValidationType = z.infer<typeof budgetSingleValidation>;

export const budgetGetValidation = z.array(
  budgetSingleValidation
    .merge(journalCountValidation)
    .merge(userIsAdminValidation)
    .strict()
);

export type BudgetGetValidationType = z.infer<typeof budgetGetValidation>;

import { z } from "zod";

export const createBudgetValidationWithoutAG = z.object({
  title: z.string().min(2),
});

export const createBudgetValidation = createBudgetValidationWithoutAG.merge(
  z.object({
    accountGroupingId: z.string().cuid(),
  })
);

export type createBudgetValidationType = z.infer<typeof createBudgetValidation>;

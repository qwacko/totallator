import { z } from "zod";

import { PrismaStatusEnumValidation } from "src/utils/validation/PrismaStatusEnumValidation";

export const updateBudgetDataValidation = z.object({
  title: z.string().min(2).optional(),
  status: PrismaStatusEnumValidation.optional()
});

export type updateBudgetDataValidationType = z.infer<
  typeof updateBudgetDataValidation
>;

export const updateBudgetValidation = z.object({
  id: z.string().cuid(),
  data: updateBudgetDataValidation
});

export type updateBudgetValidationType = z.infer<typeof updateBudgetValidation>;

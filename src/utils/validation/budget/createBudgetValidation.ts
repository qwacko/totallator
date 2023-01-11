import { z } from "zod";

import { PrismaStatusEnumValidation } from "../PrismaStatusEnumValidation";

export const createBudgetValidation = z.object({
  title: z.string().min(2),
  accountGroupingId: z.string().cuid(),
  status: PrismaStatusEnumValidation.optional()
});

export type createBudgetValidationType = z.infer<typeof createBudgetValidation>;

import { z } from "zod";

import { PrismaAccountTypeEnumValidation } from "../PrismaAccountTypeEnumValidation";
import { PrismaStatusEnumValidation } from "../PrismaStatusEnumValidation";

export const createAccountValidation = z.object({
  title: z.string().min(1),
  accountGroup: z.string().min(2).optional(),
  accountGroup2: z.string().min(2).optional(),
  accountGroup3: z.string().min(2).optional(),
  isCash: z.boolean().default(true).optional(),
  isNetWorth: z.boolean().default(true).optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  type: PrismaAccountTypeEnumValidation.default("Expense").optional(),
  accountGroupingId: z.string().cuid(),
  status: PrismaStatusEnumValidation.optional()
});

export type createAccountValidationType = z.infer<
  typeof createAccountValidation
>;

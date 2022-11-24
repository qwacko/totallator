import { z } from "zod";
import { PrismaAccountTypeEnumValidation } from "../PrismaAccountTypeEnumValidation";

export const createAccountValidation = z.object({
  title: z.string().min(2),
  accountGroup: z.string().min(2).optional(),
  accountGroup2: z.string().min(2).optional(),
  accountGroup3: z.string().min(2).optional(),
  accountGroupingId: z.string().cuid(),
  isCash: z.boolean().default(true).optional(),
  isNetWorth: z.boolean().default(true).optional(),
  type: PrismaAccountTypeEnumValidation.default("Expense").optional(),
});

export type createAccountValidationType = z.infer<
  typeof createAccountValidation
>;

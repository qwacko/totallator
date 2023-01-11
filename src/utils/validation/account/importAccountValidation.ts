import { z } from "zod";

import { PrismaAccountTypeEnumValidation } from "../PrismaAccountTypeEnumValidation";
import { PrismaStatusEnumValidation } from "../PrismaStatusEnumValidation";

export const importAccountSingleValidation = z.object({
  id: z.string().optional(),
  title: z.string(),
  type: PrismaAccountTypeEnumValidation,
  isCash: z.boolean(),
  isNetWorth: z.boolean(),
  accountGroup: z.string().optional().nullable(),
  accountGroup2: z.string().optional().nullable(),
  accountGroup3: z.string().optional().nullable(),
  startDate: z.date().optional().nullable(),
  endDate: z.date().optional().nullable(),
  status: PrismaStatusEnumValidation,
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
});

export type importAccountSingleValidationType = z.infer<
  typeof importAccountSingleValidation
>;

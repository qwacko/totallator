import { z } from "zod";
import { PrismaStatusEnumValidation } from "src/utils/validation/PrismaStatusEnumValidation";
import { PrismaAccountTypeEnumValidation } from "../PrismaAccountTypeEnumValidation";

export const updateAccountDataValidation = z.object({
  title: z.string().min(2).optional(),
  accountGroup: z.string().min(2).optional(),
  accountGroup2: z.string().min(2).optional(),
  accountGroup3: z.string().min(2).optional(),
  isCash: z.boolean().default(true).optional(),
  isNetWorth: z.boolean().default(true).optional(),
  type: PrismaAccountTypeEnumValidation.optional(),
  status: PrismaStatusEnumValidation.optional(),
});

export type updateAccountDataValidationType = z.infer<
  typeof updateAccountDataValidation
>;

export const updateAccountValidation = z.object({
  id: z.string().cuid(),
  data: updateAccountDataValidation,
});

export type updateAccountValidationType = z.infer<
  typeof updateAccountValidation
>;

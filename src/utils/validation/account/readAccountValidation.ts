import { z } from "zod";

import { PrismaAccountTypeEnumValidation } from "../PrismaAccountTypeEnumValidation";
import {
  accountGroupingIdValidation,
  createdUpdatedValidation,
  journalCountValidation,
  statusReturnValidation,
  userIsAdminValidation
} from "../returnValidationHelpers";

export const accountSingleValidation = z
  .object({
    id: z.string().cuid(),
    title: z.string(),
    type: PrismaAccountTypeEnumValidation,
    isCash: z.boolean(),
    isNetWorth: z.boolean(),
    accountGroup: z.string().optional().nullable(),
    accountGroup2: z.string().optional().nullable(),
    accountGroup3: z.string().optional().nullable(),
    accountGroupCombined: z.string().nullable(),
    accountTitleCombined: z.string().nullable(),
    startDate: z.date().optional().nullable(),
    endDate: z.date().optional().nullable()
  })
  .merge(statusReturnValidation)
  .merge(createdUpdatedValidation)
  .merge(accountGroupingIdValidation);

export type accountSingleValidationType = z.infer<
  typeof accountSingleValidation
>;

export const accountGetValidation = z.array(
  accountSingleValidation
    .merge(journalCountValidation)
    .merge(userIsAdminValidation)
    .strict()
);

export type AccountGetValidationType = z.infer<typeof accountGetValidation>;

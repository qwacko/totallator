import { z } from "zod";

import { PrismaAccountTypeEnumValidation } from "../PrismaAccountTypeEnumValidation";
import {
  accountGroupingIdValidation,
  createdUpdatedValidation,
  statusReturnValidation
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

import { z } from "zod";

import {
  accountGroupingIdValidation,
  createdUpdatedValidation,
  statusReturnValidation
} from "../returnValidationHelpers";

export const tagSingleValidation = z
  .object({
    id: z.string().cuid(),
    title: z.string(),
    group: z.string(),
    single: z.string()
  })
  .merge(statusReturnValidation)
  .merge(createdUpdatedValidation)
  .merge(accountGroupingIdValidation);

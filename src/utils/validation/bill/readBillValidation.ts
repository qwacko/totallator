import { z } from "zod";

import {
  accountGroupingIdValidation,
  createdUpdatedValidation,
  statusReturnValidation
} from "../returnValidationHelpers";

export const billSingleValidation = z
  .object({
    id: z.string().cuid(),
    title: z.string()
  })
  .merge(statusReturnValidation)
  .merge(createdUpdatedValidation)
  .merge(accountGroupingIdValidation);

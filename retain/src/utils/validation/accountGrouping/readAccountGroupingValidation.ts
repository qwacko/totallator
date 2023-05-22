import { z } from "zod";

import {
  createdUpdatedValidation,
  statusReturnValidation
} from "../returnValidationHelpers";

export const accountGroupingSingleValidation = z
  .object({
    id: z.string().cuid(),
    title: z.string()
  })
  .merge(statusReturnValidation)
  .merge(createdUpdatedValidation);

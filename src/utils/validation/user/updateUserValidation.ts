import { z } from "zod";

import { currencyFormatValidation } from "./currencyFormats";
import { dbDateFormatValidation } from "./dateFormats";

export const updateUserValidation = z.object({
  name: z.string().min(2).optional(),
  darkMode: z.boolean().optional(),
  firstMonthFY: z.number().int().min(1).max(12).optional(),
  dateFormat: dbDateFormatValidation.optional(),
  currencyFormat: currencyFormatValidation.optional()
});

export type UpdateUserValidationType = z.infer<typeof updateUserValidation>;

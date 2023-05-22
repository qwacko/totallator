import { z } from "zod";

import { PrismaStatusEnumValidation } from "../PrismaStatusEnumValidation";

export const importBillSingleValidation = z.object({
  id: z.string().optional(),
  title: z.string(),
  status: PrismaStatusEnumValidation,
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
});

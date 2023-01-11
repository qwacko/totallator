import { z } from "zod";

import { PrismaStatusEnumValidation } from "../PrismaStatusEnumValidation";

export const importCategorySingleValidation = z.object({
  id: z.string().optional(),
  group: z.string(),
  single: z.string(),
  status: PrismaStatusEnumValidation,
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
});

export type importCategorySingleValidationType = z.infer<
  typeof importCategorySingleValidation
>;

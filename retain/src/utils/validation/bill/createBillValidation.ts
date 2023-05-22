import { z } from "zod";

import { PrismaStatusEnumValidation } from "../PrismaStatusEnumValidation";

export const createBillValidation = z.object({
  title: z.string().min(2),
  accountGroupingId: z.string().cuid(),
  status: PrismaStatusEnumValidation.optional()
});

export type createBillValidationType = z.infer<typeof createBillValidation>;

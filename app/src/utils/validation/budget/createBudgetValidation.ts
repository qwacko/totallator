import { PrismaStatusEnum } from "@prisma/client";
import { z } from "zod";

export const createBudgetValidation = z.object({
  title: z.string().min(2),
  accountGroupingId: z.string().cuid(),
  status: PrismaStatusEnum.optional(),
});

export type createBudgetValidationType = z.infer<typeof createBudgetValidation>;

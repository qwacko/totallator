import { z } from "zod";
import { PrismaStatusEnumValidation } from "src/server/trpc/router/PrismaStatusEnumValidation";

export const updateBillDataValidation = z.object({
  title: z.string().optional(),
  status: PrismaStatusEnumValidation.optional(),
});

export type updateBillDataValidationType = z.infer<
  typeof updateBillDataValidation
>;

export const updateBillValidation = z.object({
  id: z.string().cuid(),
  data: updateBillDataValidation,
});

export type updateBillValidationType = z.infer<typeof updateBillValidation>;

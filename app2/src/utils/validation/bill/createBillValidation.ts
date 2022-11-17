import { z } from "zod";

export const createBillValidation = z.object({
  title: z.string(),
  accountGroupingId: z.string().cuid(),
});

export type createBillValidationType = z.infer<typeof createBillValidation>;

import { z } from "zod";

export const createBillValidationWithoutAG = z.object({
  title: z.string().min(2),
});

export const createBillValidation = createBillValidationWithoutAG.merge(
  z.object({
    accountGroupingId: z.string().cuid(),
  })
);

export type createBillValidationType = z.infer<typeof createBillValidation>;

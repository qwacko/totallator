import { z } from "zod";

export const createTagValidationWithoutAG = z.object({
  group: z.string().min(2),
  single: z.string().min(2),
});

export const createTagValidation = createTagValidationWithoutAG.merge(
  z.object({ accountGroupingId: z.string().cuid() })
);

export type createTagValidationType = z.infer<typeof createTagValidation>;

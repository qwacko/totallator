import { z } from "zod";

export const createTagValidation = z.object({
  group: z.string().min(2),
  single: z.string().min(2),
  accountGroupingId: z.string().cuid(),
});

export type createTagValidationType = z.infer<typeof createTagValidation>;

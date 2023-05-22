import { z } from "zod";

export const dateFilterNonOptional = z.object({
  gte: z.date().optional(),
  lte: z.date().optional()
});

export type DateFilterNonOptionalType = z.infer<typeof dateFilterNonOptional>;

export const dateFilter = dateFilterNonOptional.optional();

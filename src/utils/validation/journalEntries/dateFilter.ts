import { z } from "zod";

export const dateFilter = z
  .object({
    gte: z.date().optional(),
    lte: z.date().optional()
  })
  .optional();

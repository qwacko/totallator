import { z } from "zod";

export const stringFilter = z
  .object({
    contains: z.string().optional(),
    mode: z
      .enum(["insensitive", "default"] as const)
      .optional()
      .default("insensitive")
  })
  .optional();

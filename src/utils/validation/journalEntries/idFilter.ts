import { z } from "zod";

export const idFilter = z
  .object({
    in: z.array(z.string().cuid()).optional(),
    notIn: z.array(z.string().cuid()).optional()
  })
  .optional();

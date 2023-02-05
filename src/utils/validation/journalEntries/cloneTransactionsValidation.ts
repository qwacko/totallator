import { z } from "zod";

export const cloneTransactionInput = z.object({
  ids: z.array(z.string().cuid()).optional(),
  journalIds: z.array(z.string().cuid()).optional(),
  maxUpdated: z.number().optional().default(20),
  cloneCount: z.number().int().optional().default(1)
});

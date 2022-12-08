import { z } from "zod";

export const cloneTransactionInput = z.object({
  ids: z.array(z.string().cuid()).optional(),
  maxUpdated: z.number().optional().default(20),
});

export type CloneTransactionInputType = z.infer<typeof cloneTransactionInput>;

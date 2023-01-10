import { z } from "zod";

export const deleteTransactionInput = z.object({
  ids: z.array(z.string().cuid()).optional(),
  maxDeleted: z.number().optional().default(20),
  canDeleteComplete: z.boolean().optional().default(false),
});

export type DeleteTransactionInputType = z.infer<typeof deleteTransactionInput>;

import { z } from "zod";

import { createSingleJournalValidation } from "./createJournalValidation";

export const upsertJournalValidation = createSingleJournalValidation
  .omit({ accountGroupingId: true })
  .merge(
    z.object({
      id: z.string().optional(),
      transactionId: z
        .string()
        .or(z.number().transform((val) => val.toString()))
    })
  )
  .strip();

export type UpsertJournalValidationType = z.infer<
  typeof upsertJournalValidation
>;

export const upsertJournalsValidation = z.array(upsertJournalValidation);

export type UpsertJournalsValidationType = z.infer<
  typeof upsertJournalsValidation
>;

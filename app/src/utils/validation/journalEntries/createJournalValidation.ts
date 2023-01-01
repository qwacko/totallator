import { omit } from "lodash";
import { z } from "zod";
import { compareLinked } from "../../compareLinked";

export const createSimpleTransactionValidation = z.object({
  //Basic Information
  description: z.string(),
  date: z.date(),
  amount: z.number(),

  //Accounts
  fromAccountId: z.string(),
  toAccountId: z.string(),

  //Linked Items
  accountGroupingId: z.string().cuid(),
  billId: z.string().optional(),
  budgetId: z.string().optional(),
  categoryId: z.string().optional(),
  tagId: z.string().optional(),

  //Status
  reconciled: z.boolean().optional().default(false),
  dataChecked: z.boolean().optional().default(false),
  complete: z.boolean().optional().default(false),
});

export type createSimpleTransactionValidationType = z.infer<
  typeof createSimpleTransactionValidation
>;

export const createSingleJournalValidation = z.object({
  //Basic Information
  description: z.string(),
  date: z.date(),
  amount: z.number(),

  //Complete Transaction Information
  linked: z.boolean().optional().default(true),

  //Linked Items
  accountId: z.string(),
  accountGroupingId: z.string().cuid(),
  billId: z.string().optional(),
  budgetId: z.string().optional(),
  categoryId: z.string().optional(),
  tagId: z.string().optional(),

  //Status
  reconciled: z.boolean().optional().default(false),
  dataChecked: z.boolean().optional().default(false),
  complete: z.boolean().optional().default(false),
});

export type createSingleJournalValidationType = z.infer<
  typeof createSingleJournalValidation
>;

export const createTransactionValidation = z
  .array(createSingleJournalValidation)
  .min(2)
  .refine(
    (data) => {
      if (data[0]?.linked) {
        const firstData = omit(data[0], ["accountId", "amount"]);
        return data.reduce((prev, current) => {
          if (prev) {
            const currentData = omit(current, ["accountId", "amount"]);
            return compareLinked(firstData, currentData);
          }
          return prev;
        }, true);
      } else {
        return true;
      }
    },
    {
      message:
        "For linked journal entries, all values other than account and amount must be equal",
    }
  )
  .refine(
    (data) => new Set(data.map((item) => item.accountGroupingId)).size === 1,
    {
      message:
        "All journals for a transaction must be the same account grouping",
    }
  )
  .refine((data) => new Set(data.map((item) => item.linked)).size === 1, {
    message: "All journals for a transaction must be the same linked setting",
  });

export type createTransactionValidationType = z.infer<
  typeof createTransactionValidation
>;

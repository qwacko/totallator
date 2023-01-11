import type { Prisma } from "@prisma/client";
import { z } from "zod";

import { PrismaAccountTypeEnumValidation } from "src/utils/validation/PrismaAccountTypeEnumValidation";

export const rawJournalQueryReturnValidation = z.array(
  z.object({
    id: z.string().cuid(),
    date: z.date(),
    description: z.string(),
    linked: z.boolean(),
    reconciled: z.boolean(),
    dataChecked: z.boolean(),
    complete: z.boolean(),
    amount: z.preprocess((input) => {
      const val = input as Prisma.Decimal;
      return val.toNumber();
    }, z.number()),
    accountId: z.string().cuid(),
    accountGroupingId: z.string().cuid(),
    billId: z.string().cuid().nullable(),
    budgetId: z.string().cuid().nullable(),
    tagId: z.string().cuid().nullable(),
    categoryId: z.string().cuid().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    transactionId: z.string().cuid(),
    accountTitle: z.string(),
    accountType: PrismaAccountTypeEnumValidation,
    accountIsCash: z.boolean(),
    accountIsNetWorth: z.boolean(),
    billTitle: z.string().nullable(),
    budgetTitle: z.string().nullable(),
    categoryTitle: z.string().nullable(),
    tagTitle: z.string().nullable(),
    otherjournals: z.array(
      z.object({
        transactionId: z.string().cuid(),
        journalId: z.string().cuid(),
        amount: z.number()
      })
    ),
    isAdmin: z.boolean()
  })
);

import type { Prisma, PrismaClient } from "@prisma/client";
import { createAccountValidation } from "src/utils/validation/account/createAccountValidation";
import { createBillValidation } from "src/utils/validation/bill/createBillValidation";
import { createBudgetValidation } from "src/utils/validation/budget/createBudgetValidation";
import { createCategoryValidation } from "src/utils/validation/category/createCategoryValidation";
import { createTagValidation } from "src/utils/validation/tag/createTagValidation";
import { z } from "zod";
import { upsertAccounts } from "./accounts/upsertAccounts";

const bulkUpdateAccountGroupingValidation = z.object({
  accountGroupingId: z.string().cuid(),
  createIncomeAccountTitles: z.array(z.string()).optional(),
  createExpenseAccountTitles: z.array(z.string()).optional(),
  createAssetAccountTitles: z.array(z.string()).optional(),
  createLiabilityAccountTitles: z.array(z.string()).optional(),
  upsertAccounts: z
    .array(
      createAccountValidation
        .omit({ accountGroupingId: true })
        .merge(z.object({ id: z.string() }))
    )
    .optional(),
  createTagTitles: z.array(z.string()).optional(),
  tags: z
    .array(createTagValidation.omit({ accountGroupingId: true }))
    .optional(),
  createBillTitles: z.array(z.string()).optional(),
  bills: z
    .array(createBillValidation.omit({ accountGroupingId: true }))
    .optional(),
  createCategoryTitles: z.array(z.string()).optional(),
  categories: z
    .array(createCategoryValidation.omit({ accountGroupingId: true }))
    .optional(),
  createBudgetTitles: z.array(z.string()).optional(),
  budgets: z
    .array(createBudgetValidation.omit({ accountGroupingId: true }))
    .optional(),
  journals: z
    .array(
      z.object({
        accountTitle: z.string().optional(),
        accountId: z.string().optional(),
      })
    )
    .optional(),
});

export type BulkUpgradeAccountGroupingValidationType = z.infer<
  typeof bulkUpdateAccountGroupingValidation
>;

export const bulkUpdateAccountGrouping = async ({
  prisma,
  input,
  userId,
  userIsAdmin,
}: {
  prisma: PrismaClient | Prisma.TransactionClient;
  input: BulkUpgradeAccountGroupingValidationType;
  userId: string;
  userIsAdmin?: boolean;
}) => {
  const accountInfo = await upsertAccounts({
    prisma,
    data: input,
    userId,
    userIsAdmin,
  });
};

export type UpsertReturnType<T> = {
  idLookup: Record<string, T>;
  nameLookup: Record<string, T>;
};

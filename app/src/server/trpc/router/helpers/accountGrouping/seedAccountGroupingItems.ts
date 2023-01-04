import type { Prisma, PrismaClient, User } from "@prisma/client";
import type { SeedAccountGroupingValidationType } from "src/utils/validation/accountGrouping/seedAccountGroupingValidation";
import { bulkUpdateAccountGrouping } from "../bulkUpdateAccountGrouping";
import { buildSeedTransactions } from "./buildSeedTransactions";
import { businessSeedData } from "./businessSeedItems";
import { mergeSeedItems } from "./mergeSeedItems";
import { personalSeedData } from "./personalSeedItems";

export const createBusinessItems = async ({
  prisma,
  accountGroupingId,
  user,
  input,
}: {
  accountGroupingId: string;
  prisma: PrismaClient | Prisma.TransactionClient;
  user: User;
  input: SeedAccountGroupingValidationType;
}) => {
  if (input.includeBusiness) {
    console.log(`Seeding ${input.transactionCountEach} Transactions.`);
    await bulkUpdateAccountGrouping({
      user,
      prisma,
      input: {
        accountGroupingId,
        ...mergeSeedItems({
          data: businessSeedData,
          sample: input.seedAsSample,
          includeAccounts: input.includeAccounts,
        }),
        createSimpleTransactions: buildSeedTransactions({
          inputConfig: businessSeedData,
          transConfig: [],
          queryConfig: input,
        }),
      },
    });
  }
};
export const createPersonalItems = async ({
  prisma,
  accountGroupingId,
  user,
  input,
}: {
  accountGroupingId: string;
  prisma: PrismaClient | Prisma.TransactionClient;
  user: User;
  input: SeedAccountGroupingValidationType;
}) => {
  if (input.includePersonal) {
    console.log(`Seeding ${input.transactionCountEach} Transactions.`);
    await bulkUpdateAccountGrouping({
      prisma,
      user,
      input: {
        accountGroupingId,
        ...mergeSeedItems({
          sample: input.seedAsSample,
          includeAccounts: input.includeAccounts,
          data: personalSeedData,
        }),
      },
    });
  }
};

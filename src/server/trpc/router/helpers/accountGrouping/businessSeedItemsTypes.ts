import type { DefaultTransactionSeedingConfig } from "./buildSeedTransactions";
import type { businessSeedData } from "./businessSeedItems";

type businessAccountOptions =
  | typeof businessSeedData["assetAccounts"][number]
  | typeof businessSeedData["liabilityAccounts"][number]
  | typeof businessSeedData["incomeAccounts"][number]
  | typeof businessSeedData["expenseAccounts"][number];
type businessAccountSampleOptions =
  | typeof businessSeedData["assetAccounts"][number]
  | typeof businessSeedData["liabilityAccounts"][number]
  | typeof businessSeedData["incomeAccounts"][number]
  | typeof businessSeedData["expenseAccounts"][number]
  | typeof businessSeedData["assetAccountsSample"][number]
  | typeof businessSeedData["liabilityAccountsSample"][number]
  | typeof businessSeedData["incomeAccountsSample"][number]
  | typeof businessSeedData["expenseAccountsSample"][number];
type businessCategoryOptions = typeof businessSeedData["categories"][number];
type businessCategorySampleOptions =
  | typeof businessSeedData["categories"][number]
  | typeof businessSeedData["categoriesSample"][number];
type businessBillOptions = typeof businessSeedData["bills"][number];
type businessBillSampleOptions =
  | typeof businessSeedData["bills"][number]
  | typeof businessSeedData["billsSample"][number];
type businessBudgetOptions = typeof businessSeedData["budgets"][number];
type businessBudgetSampleOptions =
  | typeof businessSeedData["budgets"][number]
  | typeof businessSeedData["budgetsSample"][number];
type businessTagOptions = typeof businessSeedData["tags"][number];
type businessTagSampleOptions =
  | typeof businessSeedData["tags"][number]
  | typeof businessSeedData["tagsSample"][number];
export type businessTransactionSeedingConfig = DefaultTransactionSeedingConfig<
  businessAccountOptions,
  businessCategoryOptions,
  businessBillOptions,
  businessBudgetOptions,
  businessTagOptions
>;
export type businessTransactionSeedingSampleConfig =
  DefaultTransactionSeedingConfig<
    businessAccountSampleOptions,
    businessCategorySampleOptions,
    businessBillSampleOptions,
    businessBudgetSampleOptions,
    businessTagSampleOptions
  >;

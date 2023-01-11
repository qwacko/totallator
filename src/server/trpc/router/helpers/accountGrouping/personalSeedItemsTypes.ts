import type { DefaultTransactionSeedingConfig } from "./buildSeedTransactions";
import type { personalSeedData } from "./personalSeedItems";

type personalAccountOptions =
  | (typeof personalSeedData)["assetAccounts"][number]
  | (typeof personalSeedData)["liabilityAccounts"][number]
  | (typeof personalSeedData)["incomeAccounts"][number]
  | (typeof personalSeedData)["expenseAccounts"][number];
type personalAccountSampleOptions =
  | (typeof personalSeedData)["assetAccounts"][number]
  | (typeof personalSeedData)["liabilityAccounts"][number]
  | (typeof personalSeedData)["incomeAccounts"][number]
  | (typeof personalSeedData)["expenseAccounts"][number]
  | (typeof personalSeedData)["assetAccountsSample"][number]
  | (typeof personalSeedData)["liabilityAccountsSample"][number]
  | (typeof personalSeedData)["incomeAccountsSample"][number]
  | (typeof personalSeedData)["expenseAccountsSample"][number];
type personalCategoryOptions = (typeof personalSeedData)["categories"][number];
type personalCategorySampleOptions =
  | (typeof personalSeedData)["categories"][number]
  | (typeof personalSeedData)["categoriesSample"][number];
type personalBillOptions = (typeof personalSeedData)["bills"][number];
type personalBillSampleOptions =
  | (typeof personalSeedData)["bills"][number]
  | (typeof personalSeedData)["billsSample"][number];
type personalBudgetOptions = (typeof personalSeedData)["budgets"][number];
type personalBudgetSampleOptions =
  | (typeof personalSeedData)["budgets"][number]
  | (typeof personalSeedData)["budgetsSample"][number];
type personalTagOptions = (typeof personalSeedData)["tags"][number];
type personalTagSampleOptions =
  | (typeof personalSeedData)["tags"][number]
  | (typeof personalSeedData)["tagsSample"][number];
export type personalTransactionSeedingConfig = DefaultTransactionSeedingConfig<
  personalAccountOptions,
  personalCategoryOptions,
  personalBillOptions,
  personalBudgetOptions,
  personalTagOptions
>;
export type personalTransactionSeedingSampleConfig =
  DefaultTransactionSeedingConfig<
    personalAccountSampleOptions,
    personalCategorySampleOptions,
    personalBillSampleOptions,
    personalBudgetSampleOptions,
    personalTagSampleOptions
  >;

import { TRPCError } from "@trpc/server";
import {
  SeedAcconutGroupingInputValidationType,
  SeedAccountGroupingValidationType,
} from "src/utils/validation/accountGrouping/seedAccountGroupingValidation";
import { createSimpleTransactionValidationType } from "src/utils/validation/journalEntries/createJournalValidation";
import { mergeSeedItems, SeedInputData } from "./mergeSeedItems";
import { faker } from "@faker-js/faker";
import { differenceInDays, subYears } from "date-fns";

export type DefaultTransactionSeedingConfig = {
  descriptions: string[];
  dateStart: Date;
  dateEnd: Date;
  amountMax: number;
  amountMin: number;
  fromAccounts: string[];
  toAccounts: string[];
  bills?: (string | undefined)[];
  budgets?: (string | undefined)[];
  categories?: (string | undefined)[];
  tags?: (string | undefined)[];
  daysSinceReconciled?: number;
  daysSinceChecked?: number;
  daysSinceComplete?: number;
  weighting: number;
};

export const buildSeedTransactions = ({
  inputConfig,
  transConfig,
  queryConfig,
}: {
  inputConfig: SeedInputData;
  transConfig: DefaultTransactionSeedingConfig[];
  queryConfig: SeedAccountGroupingValidationType;
}): createSimpleTransactionValidationType[] => {
  checkSeedTransactionConfig({ inputConfig, queryConfig, transConfig });

  const totalWeighting = transConfig.reduce(
    (prev, current) => prev + current.weighting,
    0
  );
  const transPerWeighting = Math.ceil(
    queryConfig.transactionCount / totalWeighting
  );

  const endDate = new Date();
  const startDate = subYears(endDate, queryConfig.numberYears);

  const returnTrans: createSimpleTransactionValidationType[] = [];

  transConfig.forEach((config) => {
    const numberGenerated = Math.ceil(config.weighting * transPerWeighting);

    //Generate the transactions
    for (let i = 0; i < numberGenerated; i++) {
      console.log("Generating Transaction With Config", config);
      const transDate = faker.date.between(startDate, endDate);
      const daysSinceTrans = differenceInDays(transDate, endDate);
      returnTrans.push({
        description: faker.helpers.arrayElement(config.descriptions),
        accountGroupingId: queryConfig.accountGroupingId,
        amount: faker.datatype.number({
          min: config.amountMin,
          max: config.amountMax,
          precision: 2,
        }),
        date: transDate,
        fromAccountId: faker.helpers.arrayElement(config.fromAccounts),
        toAccountId: faker.helpers.arrayElement(config.toAccounts),
        billId: config.bills
          ? faker.helpers.arrayElement(config.bills)
          : undefined,
        budgetId: config.budgets
          ? faker.helpers.arrayElement(config.budgets)
          : undefined,
        categoryId: config.categories
          ? faker.helpers.arrayElement(config.categories)
          : undefined,
        tagId: config.tags
          ? faker.helpers.arrayElement(config.tags)
          : undefined,
        reconciled: daysSinceTrans > (config.daysSinceReconciled || 0),
        dataChecked: daysSinceTrans > (config.daysSinceChecked || 0),
        complete: daysSinceTrans > (config.daysSinceComplete || 0),
      });
    }
  });

  return returnTrans;
};

const checkSeedTransactionConfig = ({
  inputConfig,
  transConfig,
  queryConfig,
}: {
  inputConfig: SeedInputData;
  transConfig: DefaultTransactionSeedingConfig[];
  queryConfig: SeedAccountGroupingValidationType;
}) => {
  //Check that all of the transConfig data is in the inputConfig
  const errors: string[] = [];
  const combinedSeedData = mergeSeedItems({
    sample: queryConfig.seedAsSample,
    data: inputConfig,
    includeAccounts: queryConfig.includeAccounts,
  });

  const checkAccounts = [
    ...(combinedSeedData.createAssetAccountTitles || []),
    ...(combinedSeedData.createLiabilityAccountTitles || []),
    ...(combinedSeedData.createIncomeAccountTitles || []),
    ...(combinedSeedData.createExpenseAccountTitles || []),
  ];
  const checkBills = combinedSeedData.createBillTitles || [];
  const checkBudgets = combinedSeedData.createBudgetTitles || [];
  const checkCategories = combinedSeedData.createCategoryTitles || [];
  const checkTags = combinedSeedData.createTagTitles || [];

  transConfig.forEach((trans, index) => {
    const checkSingle = ({
      data,
      options,
      title,
    }: {
      data: (string | undefined)[] | undefined;
      options: string[];
      title: string;
    }) => {
      data &&
        data.map((item) => {
          if (item && !options.includes(item)) {
            console.log(`Config ${index}. Seeding ${title} Not Found ${item}`);
            errors.push(`Config ${index}. Seeding ${title} Not Found ${item}`);
          }
        });
    };

    checkSingle({
      data: trans.fromAccounts,
      options: checkAccounts,
      title: "From Account",
    });
    checkSingle({
      data: trans.toAccounts,
      options: checkAccounts,
      title: "To Account",
    });
    checkSingle({
      data: trans.bills,
      options: checkBills,
      title: "Bill",
    });
    checkSingle({
      data: trans.budgets,
      options: checkBudgets,
      title: "Budget",
    });
    checkSingle({
      data: trans.categories,
      options: checkCategories,
      title: "Category",
    });
    checkSingle({
      data: trans.tags,
      options: checkTags,
      title: "Tag",
    });
  });

  if (errors.length > 0) {
    console.log("Seeding Errors Found", errors);
    throw new TRPCError({
      message: "Errors with seeding config",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};

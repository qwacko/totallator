import type {
  businessTransactionSeedingConfig,
  businessTransactionSeedingSampleConfig
} from "./businessSeedItemsTypes";

export const businessSeedData = {
  assetAccounts: [
    "Business/Bank/Transactional",
    "Business/Inventory/On Premise"
  ],
  assetAccountsSample: [],
  liabilityAccounts: [
    "Business/Bank/Short Term Loan",
    "Business/Bank/Capex Loan",
    "Business/Bank/Credit Card"
  ],
  liabilityAccountsSample: [],
  incomeAccounts: [
    "Business Customer 1",
    "Business Customer 2",
    "Business Customer 3"
  ],
  incomeAccountsSample: [],
  expenseAccounts: [
    "Supplier A",
    "Supplier B",
    "Transportation Company",
    "Logistics Company",
    "Skrinkage"
  ],
  expenseAccountsSample: [],
  bills: ["Lease", "Transportation"],
  billsSample: [],
  budgets: ["Regular Expenses", "Overheads"],
  budgetsSample: [],
  categories: ["Business Category/Number 1", "Business Category/Number 2"],
  categoriesSample: [],
  tags: [],
  tagsSample: []
} as const;

export const businessTransactionSeeding: businessTransactionSeedingConfig[] = [
  {
    fromAccounts: ["Skrinkage"],
    toAccounts: ["Business Customer 1", "Business Customer 2"],
    amountMax: 200,
    amountMin: 0,
    descriptions: ["Test Description 1", "Test Description 2"],
    weighting: 10
  }
];

export const businessTransactionSampleSeeding: businessTransactionSeedingSampleConfig[] =
  [
    ...businessTransactionSeeding,
    {
      fromAccounts: ["Business/Bank/Transactional"],
      toAccounts: ["Business Customer 2"],
      amountMax: 200,
      amountMin: 0,
      descriptions: ["Who Knows", "Random Transactions"],
      weighting: 10
    }
  ];

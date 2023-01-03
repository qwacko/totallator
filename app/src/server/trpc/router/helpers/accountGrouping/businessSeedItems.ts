import type { SeedInputData } from "./mergeSeedItems";

export const businessSeedData: SeedInputData = {
  assetAccounts: [
    "Business/Bank/Transactional",
    "Business/Inventory/On Premise",
  ],
  assetAccountsSample: [],
  liabilityAccounts: [
    "Business/Bank/Short Term Loan",
    "Business/Bank/Capex Loan",
    "Business/Bank/Credit Card",
  ],
  liabilityAccountsSample: [],
  incomeAccounts: [
    "Business Customer 1",
    "Business Customer 2",
    "Business Customer 3",
  ],
  incomeAccountsSample: [],
  expenseAccounts: [
    "Supplier A",
    "Supplier B",
    "Transportation Company",
    "Logistics Company",
    "Skrinkage",
  ],
  expenseAccountsSample: [],
  bills: ["Lease", "Transportation"],
  billsSample: [],
  budgets: ["Regular Expenses", "Overheads"],
  budgetsSample: [],
  categories: ["Business Category/Number 1", "Business Category/Number 2"],
  categoriesSample: [],
  tags: [],
  tagsSample: [],
} as const;

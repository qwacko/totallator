import type { SeedInputData } from "./mergeSeedItems";

export const personalSeedData: SeedInputData = {
  assetAccounts: [
    "Cash",
    "Personal/Bank/Primary/Cash",
    "Personal/Bank/Primary/Checking",
    "Personal/Bank/Secondary/Savings",
    "Personal/Bank/Secondary/Cash",
    "Personal/Bank/Secondary/Checking",
    "Property/Main Home",
    "Property/Holiday House",
  ],
  assetAccountsSample: [],
  liabilityAccounts: [
    "Personal/Bank/Primary/Credit Card",
    "Property/Main Home Mortgage 1",
    "Property/Main Home Mortgage 2",
    "Property/Holiday Home Mortgage",
  ],
  liabilityAccountsSample: [],
  incomeAccounts: [
    "Employer 1",
    "Bank Interest",
    "Employer 2",
    "Initial Value",
    "Capital Gains",
  ],
  incomeAccountsSample: [],
  expenseAccounts: [
    "Tax",
    "Government",
    "Supermarket A",
    "Supermarket B",
    "Petrol Station",
    "Fast Food A",
    "Fast Food B",
    "Bank A",
    "Bank B",
    "Bank C",
    "Appliance Store",
    "Hardware Store",
    "Parking",
    "Airline",
    "Restaurant A",
    "Restaurant B",
    "Hotel A",
    "Hotel B",
    "Corner Store",
    "Furniture Store",
    "Hunting Store",
    "Power Company",
    "Water Company",
    "City Council",
    "State Government",
    "Internet Provider A",
    "Internet Provider B",
  ],
  expenseAccountsSample: [],
  bills: ["Rent", "Power", "Internet"],
  billsSample: [],
  budgets: ["Bills", "Spending", "Transportation"],
  budgetsSample: [],
  categories: [],
  categoriesSample: [],
  tags: [
    "Personal/Personal",
    "Property/Property A",
    "Property/Property B",
    "Personal/Capital",
  ],
  tagsSample: [],
} as const;
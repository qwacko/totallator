import type { Prisma, PrismaClient, User } from "@prisma/client";
import { bulkUpdateAccountGrouping } from "../bulkUpdateAccountGrouping";

export const createBusinessItems = async ({
  prisma,
  accountGroupingId,
  user,
}: {
  accountGroupingId: string;
  prisma: PrismaClient | Prisma.TransactionClient;
  user: User;
}) =>
  bulkUpdateAccountGrouping({
    user,
    prisma,
    input: {
      accountGroupingId,
      createAssetAccountTitles: [
        "Business/Bank/Transactional",
        "Business/Inventory/On Premise",
      ],
      createLiabilityAccountTitles: [
        "Business/Bank/Short Term Loan",
        "Business/Bank/Capex Loan",
        "Business/Bank/Credit Card",
      ],
      createIncomeAccountTitles: [
        "Business Customer 1",
        "Business Customer 2",
        "Business Customer 3",
      ],
      createExpenseAccountTitles: [
        "Supplier A",
        "Supplier B",
        "Transportation Company",
        "Logistics Company",
        "Skrinkage",
      ],
      createTagTitles: [
        "Business/Location 1",
        "Business/Location 2",
        "Business/Online",
        "Business/Overhead",
      ],
      createBillTitles: ["Lease", "Transportation"],
      createBudgetTitles: ["Regular Expenses", "Overheads"],
      createCategoryTitles: [
        "Business Category/Number 1",
        "Business Category/Number 2",
      ],
      createSimpleTransactions: [
        {
          accountGroupingId,
          amount: 50,
          complete: false,
          dataChecked: false,
          date: new Date(),
          description: "Test Generated",
          fromAccountId: "Business Customer 1",
          toAccountId: "Business/Bank/Transactional",
          reconciled: false,
          billId: undefined,
          budgetId: undefined,
          tagId: "Business/Location 1",
          categoryId: undefined,
        },
      ],
    },
  });
export const createPersonalItems = async ({
  prisma,
  accountGroupingId,
  user,
}: {
  accountGroupingId: string;
  prisma: PrismaClient | Prisma.TransactionClient;
  user: User;
}) =>
  bulkUpdateAccountGrouping({
    prisma,
    user,
    input: {
      accountGroupingId,
      createAssetAccountTitles: [
        "Cash",
        "Personal/Bank/Primary/Cash",
        "Personal/Bank/Primary/Checking",
        "Personal/Bank/Secondary/Savings",
        "Personal/Bank/Secondary/Cash",
        "Personal/Bank/Secondary/Checking",
        "Property/Main Home",
        "Property/Holiday House",
      ],
      createLiabilityAccountTitles: [
        "Personal/Bank/Primary/Credit Card",
        "Property/Main Home Mortgage 1",
        "Property/Main Home Mortgage 2",
        "Property/Holiday Home Mortgage",
      ],
      createIncomeAccountTitles: [
        "Employer 1",
        "Bank Interest",
        "Employer 2",
        "Initial Value",
        "Capital Gains",
      ],
      createExpenseAccountTitles: [
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
      createTagTitles: [
        "Personal/Personal",
        "Property/Property A",
        "Property/Property B",
        "Personal/Capital",
      ],
      createBillTitles: ["Rent", "Power", "Internet"],
      createBudgetTitles: ["Bills", "Spending", "Transportation"],
    },
  });

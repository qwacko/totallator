import { NumberInput } from "@mantine/core";
import { Prisma, PrismaClient, PrismaStatusEnum } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { createAccountValidation } from "src/utils/validation/account/createAccountValidation";
import { basicStatusToDBRequired } from "src/utils/validation/basicStatusToDB";
import { createBillValidation } from "src/utils/validation/bill/createBillValidation";
import { createBudgetValidation } from "src/utils/validation/budget/createBudgetValidation";
import { createCategoryValidation } from "src/utils/validation/category/createCategoryValidation";
import { createTagValidation } from "src/utils/validation/tag/createTagValidation";
import { z } from "zod";
import { createAccountGroupTitle } from "./accountTitleGroupHandling";
import { defaultIncExp } from "./defaultIncExp";
import { createGroupSingleTitle } from "./groupSingleHandling";

const bulkUpdateAccountGroupingValidation = z.object({
  accountGroupingId: z.string().cuid(),
  incomeAccountTitles: z.array(z.string()).optional(),
  expenseAccountTitles: z.array(z.string()).optional(),
  assetAccountTitles: z.array(z.string()).optional(),
  liabilityAccountTitles: z.array(z.string()).optional(),
  accounts: z
    .array(createAccountValidation.omit({ accountGroupingId: true }))
    .optional(),
  tagTitles: z.array(z.string()).optional(),
  tags: z
    .array(createTagValidation.omit({ accountGroupingId: true }))
    .optional(),
  billTitles: z.array(z.string()).optional(),
  bills: z
    .array(createBillValidation.omit({ accountGroupingId: true }))
    .optional(),
  categoryTitles: z.array(z.string()).optional(),
  categories: z
    .array(createCategoryValidation.omit({ accountGroupingId: true }))
    .optional(),
  budgetTitles: z.array(z.string()).optional(),
  budgets: z
    .array(createBudgetValidation.omit({ accountGroupingId: true }))
    .optional(),
});

type BulkUpgradeAccountGroupingValidationType = z.infer<
  typeof bulkUpdateAccountGroupingValidation
>;

export const bulkUpdateAccountGrouping = async ({
  prisma,
  input,
}: {
  prisma: PrismaClient | Prisma.TransactionClient;
  input: BulkUpgradeAccountGroupingValidationType;
}) => {
  const linkedItems = createLinkedItems({
    assetAccounts: input.assetAccountTitles,
    incomeAccounts: input.incomeAccountTitles,
    expenseAccounts: input.expenseAccountTitles,
    liabilityAccounts: input.liabilityAccountTitles,
    tags: input.tagTitles,
    categories: input.categoryTitles,
    bills: input.billTitles,
    budgets: input.budgetTitles,
  });

  //Create Necessary Accounts
  const transactionAccountsToCreate: Prisma.TransactionAccountCreateManyAccountGroupingInput[] =
    [
      ...(input.accounts ? input.accounts : []),
      ...linkedItems.accountCreationAll,
    ];

  //Create Tags
  const tagsToCreate: Prisma.TagCreateManyAccountGroupingInput[] = [
    ...(input.tags
      ? input.tags.map((item) => ({
          ...basicStatusToDBRequired("Active"),
          ...createGroupSingleTitle(item),
        }))
      : []),
    ...linkedItems.tagCreationAll,
  ];

  //Create Categories
  const categoriesToCreate: Prisma.CategoryCreateManyAccountGroupingInput[] = [
    ...(input.categories
      ? input.categories.map((item) => ({
          ...basicStatusToDBRequired("Active"),
          ...createGroupSingleTitle(item),
        }))
      : []),
    ...linkedItems.categoryCreationAll,
  ];

  //Create Bills
  const billsToCreate: Prisma.BillCreateManyAccountGroupingInput[] = [
    ...(input.bills
      ? input.bills.map((item) => ({
          ...basicStatusToDBRequired("Active"),
          ...item,
        }))
      : []),
    ...linkedItems.billCreationAll,
  ];

  //Create Budgets
  const budgetsToCreate: Prisma.BillCreateManyAccountGroupingInput[] = [
    ...(input.budgets
      ? input.budgets.map((item) => ({
          ...basicStatusToDBRequired("Active"),
          ...item,
        }))
      : []),
    ...linkedItems.budgetCreationAll,
  ];

  //Add All The Linked Items To The Account Grouping, and return all them back so jounral entries can be created
  const accountGrouping = await prisma.accountGrouping.update({
    where: { id: input.accountGroupingId },
    data: {
      accounts: { createMany: { data: transactionAccountsToCreate } },
      tags: { createMany: { data: tagsToCreate } },
      categories: { createMany: { data: categoriesToCreate } },
      bills: { createMany: { data: billsToCreate } },
      budgets: { createMany: { data: budgetsToCreate } },
    },
    include: {
      accounts: true,
      tags: true,
      bills: true,
      budgets: true,
      categories: true,
    },
  });
};

const createLinkedItems = ({
  assetAccounts,
  liabilityAccounts,
  incomeAccounts,
  expenseAccounts,
  tags,
  categories,
  bills,
  budgets,
}: {
  assetAccounts: string[] | undefined;
  liabilityAccounts: string[] | undefined;
  incomeAccounts: string[] | undefined;
  expenseAccounts: string[] | undefined;
  tags?: string[] | undefined;
  categories?: string[] | undefined;
  bills?: string[] | undefined;
  budgets?: string[] | undefined;
}) => {
  const accountCreationAll = [
    ...(assetAccounts
      ? assetAccounts.map((item) => assAct({ title: item }))
      : []),
    ...(liabilityAccounts
      ? liabilityAccounts.map((item) => assAct({ title: item, liab: true }))
      : []),
    ...(incomeAccounts
      ? incomeAccounts.map((item) => incAct({ title: item }))
      : []),
    ...(expenseAccounts
      ? expenseAccounts.map((item) => expAct({ title: item }))
      : []),
  ];

  const tagCreationAll: Prisma.TagCreateManyAccountGroupingInput[] = tags
    ? tags.map((item) => {
        const [single, group] = item.split("/").reverse();
        return {
          ...basicStatusToDBRequired("Active"),
          ...createGroupSingleTitle({
            group: group || "",
            single: single || "",
          }),
        };
      })
    : [];

  const categoryCreationAll: Prisma.CategoryCreateManyAccountGroupingInput[] =
    categories
      ? categories.map((item) => {
          const [single, group] = item.split("/").reverse();
          return {
            ...basicStatusToDBRequired("Active"),
            ...createGroupSingleTitle({
              group: group || "",
              single: single || "",
            }),
          };
        })
      : [];

  const billCreationAll: Prisma.BillCreateManyAccountGroupingInput[] = bills
    ? bills.map((item) => {
        return {
          ...basicStatusToDBRequired("Active"),
          title: item,
        };
      })
    : [];

  const budgetCreationAll: Prisma.BillCreateManyAccountGroupingInput[] = budgets
    ? budgets.map((item) => {
        return {
          ...basicStatusToDBRequired("Active"),
          title: item,
        };
      })
    : [];

  return {
    assetAccounts,
    liabilityAccounts,
    incomeAccounts,
    expenseAccounts,
    accountCreationAll,
    tagCreationAll,
    categoryCreationAll,
    billCreationAll,
    budgetCreationAll,
  };
};

const incAct = ({
  title,
}: {
  title: string;
}): Prisma.TransactionAccountCreateManyAccountGroupingInput => {
  return {
    ...basicStatusToDBRequired("Active"),
    ...defaultIncExp(title),
    type: "Income",
  };
};

const expAct = ({
  title,
}: {
  title: string;
}): Prisma.TransactionAccountCreateManyAccountGroupingInput => {
  return {
    ...basicStatusToDBRequired("Active"),
    ...defaultIncExp(title),
    type: "Expense",
  };
};

const assAct = ({
  title: combinedTitle,
  liab: isLiability = false,
}: {
  title: string;
  liab?: boolean;
}): Prisma.TransactionAccountCreateManyAccountGroupingInput => {
  const [title, ...accountGroups] = combinedTitle.split("/").reverse();
  const status: PrismaStatusEnum = "Active";

  const [accountGroup, accountGroup2, accountGroup3] = accountGroups.reverse();

  if (!title) {
    throw new TRPCError({
      message: "Account Title Is Blank",
      code: "BAD_REQUEST",
    });
  }

  return {
    isCash: true,
    isNetWorth: true,
    ...basicStatusToDBRequired(status),
    ...createAccountGroupTitle({
      title,
      accountGroup,
      accountGroup2,
      accountGroup3,
    }),
    type: isLiability ? "Liability" : "Asset",
  };
};

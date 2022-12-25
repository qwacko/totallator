import type { Prisma, PrismaClient, PrismaStatusEnum } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { omit } from "lodash";
import { notUndefinedGuard } from "src/utils/arrayHelpers";
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
  createIncomeAccountTitles: z.array(z.string()).optional(),
  createExpenseAccountTitles: z.array(z.string()).optional(),
  createAssetAccountTitles: z.array(z.string()).optional(),
  createLiabilityAccountTitles: z.array(z.string()).optional(),
  upsertAccounts: z
    .array(
      createAccountValidation
        .omit({ accountGroupingId: true })
        .merge(z.object({ id: z.string().optional() }))
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
    createAssetAccounts: input.createAssetAccountTitles,
    createIncomeAccounts: input.createIncomeAccountTitles,
    createExpenseAccounts: input.createExpenseAccountTitles,
    createLiabilityAccounts: input.createLiabilityAccountTitles,
    createTags: input.createTagTitles,
    createCategories: input.createCategoryTitles,
    createBills: input.createBillTitles,
    createBudgets: input.createBudgetTitles,
  });

  //Create Necessary Accounts
  const transactionAccountsToCreate: Prisma.TransactionAccountCreateManyAccountGroupingInput[] =
    [
      ...(input.upsertAccounts ? input.upsertAccounts : []),
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

//Needs to return a list of accounts to create, and mappings between accounts to create and account ids in journals.
const upsertAccounts = async ({
  prisma,
  list,
  accountGroupingId,
}: {
  prisma: PrismaClient | PrismaClient | Prisma.TransactionClient;
  list: BulkUpgradeAccountGroupingValidationType["upsertAccounts"];
  accountGroupingId: string;
}) => {
  if (!list) {
    return undefined;
  }

  const accountIdsToFind = list
    .map((item) => item.id)
    .filter(notUndefinedGuard);
  const noAccountIds = list.filter((item) => !item.id);

  const matchingAccounts = await prisma.transactionAccount.findMany({
    where: { id: { in: accountIdsToFind }, accountGroupingId },
  });

  const foundAccountIds = matchingAccounts.map((item) => item.id);
  const remainingAccountIds = accountIdsToFind.filter(
    (item) => !foundAccountIds.includes(item)
  );

  const accountsToCreate = [
    ...noAccountIds,
    ...list.filter((item) => item.id && remainingAccountIds.includes(item.id)),
  ].map((item) => omit(item, "id"));

  const accountsToUpdate = list.filter(
    (item) => item.id && foundAccountIds.includes(item.id)
  );

  return {
    accountsToCreate,
    accountsToUpdate: list.filter(
      (item) => item.id && foundAccountIds.includes(item.id)
    ),
  };
};

const createLinkedItems = ({
  createAssetAccounts,
  createLiabilityAccounts,
  createIncomeAccounts,
  createExpenseAccounts,
  createTags,
  createCategories,
  createBills,
  createBudgets,
}: {
  createAssetAccounts: string[] | undefined;
  createLiabilityAccounts: string[] | undefined;
  createIncomeAccounts: string[] | undefined;
  createExpenseAccounts: string[] | undefined;
  createTags?: string[] | undefined;
  createCategories?: string[] | undefined;
  createBills?: string[] | undefined;
  createBudgets?: string[] | undefined;
}) => {
  const accountCreationAll = [
    ...(createAssetAccounts
      ? createAssetAccounts.map((item) => assAct({ title: item }))
      : []),
    ...(createLiabilityAccounts
      ? createLiabilityAccounts.map((item) =>
          assAct({ title: item, liab: true })
        )
      : []),
    ...(createIncomeAccounts
      ? createIncomeAccounts.map((item) => incAct({ title: item }))
      : []),
    ...(createExpenseAccounts
      ? createExpenseAccounts.map((item) => expAct({ title: item }))
      : []),
  ];

  const tagCreationAll: Prisma.TagCreateManyAccountGroupingInput[] = createTags
    ? createTags.map((item) => {
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
    createCategories
      ? createCategories.map((item) => {
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

  const billCreationAll: Prisma.BillCreateManyAccountGroupingInput[] =
    createBills
      ? createBills.map((item) => {
          return {
            ...basicStatusToDBRequired("Active"),
            title: item,
          };
        })
      : [];

  const budgetCreationAll: Prisma.BillCreateManyAccountGroupingInput[] =
    createBudgets
      ? createBudgets.map((item) => {
          return {
            ...basicStatusToDBRequired("Active"),
            title: item,
          };
        })
      : [];

  return {
    assetAccounts: createAssetAccounts,
    liabilityAccounts: createLiabilityAccounts,
    incomeAccounts: createIncomeAccounts,
    expenseAccounts: createExpenseAccounts,
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

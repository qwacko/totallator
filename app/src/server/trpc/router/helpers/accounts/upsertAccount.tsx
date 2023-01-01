import type { Prisma, PrismaClient } from "@prisma/client";
import {
  basicStatusToDB,
  basicStatusToDBRequired,
} from "src/utils/validation/basicStatusToDB";
import type { createAccountValidationType } from "src/utils/validation/account/createAccountValidation";
import type { updateAccountDataValidationType } from "src/utils/validation/account/updateAccountValidation";
import {
  createAccountGroupTitle,
  updateAccountGroupTitle,
} from "./accountTitleGroupHandling";
import { TRPCError } from "@trpc/server";
import { defaultIncExp } from "./defaultIncExp";

type UpsertAccountData =
  | createAccountValidationType
  | updateAccountDataValidationType;

type UpsertActions = "Create" | "Update" | "Upsert";

export const upsertAccount = async ({
  data,
  id,
  accountGroupingId,
  userId,
  userAdmin = false,
  prisma,
  action,
}: {
  data: UpsertAccountData;
  id?: string | undefined;
  accountGroupingId?: string;
  userId: string;
  userAdmin?: boolean;
  prisma: PrismaClient | PrismaClient | Prisma.TransactionClient;
  action: UpsertActions;
}) => {
  if (id) {
    const foundAccount = await prisma.transactionAccount.findFirst({
      where: {
        id,
        accountGroupingId,
        ...(!userAdmin
          ? { accountGrouping: { adminUsers: { some: { id: userId } } } }
          : {}),
      },
    });
    if (foundAccount && action === "Create") {
      throw new TRPCError({
        message: "Account Found But Action Is Only Create, cannot update",
        code: "BAD_REQUEST",
      });
    } else if (foundAccount) {
      const finalType = data.type || foundAccount.type;
      if (finalType === "Expense" || finalType === "Income") {
        return prisma.transactionAccount.update({
          where: { id: foundAccount.id },
          data: {
            ...data,
            ...(data.status ? basicStatusToDBRequired(data.status) : {}),
            title: data.title,
            accountGroupCombined: null,
            accountGroup: null,
            accountGroup2: null,
            accountGroup3: null,
            accountTitleCombined: data.title,
          },
        });
      }
      return prisma.transactionAccount.update({
        where: { id: foundAccount.id },
        data: {
          ...data,
          ...(data.status ? basicStatusToDBRequired(data.status) : {}),
          ...updateAccountGroupTitle({
            title: data.title,
            accountGroup: data.accountGroup,
            accountGroup2: data.accountGroup2,
            accountGroup3: data.accountGroup3,
            accountGroupCombined:
              "accountGroupCombined" in data
                ? data.accountGroupCombined
                : undefined,
            existing: foundAccount,
          }),
        },
      });
    }
  }
  if (action === "Update") {
    throw new TRPCError({
      message: "No account found to update",
      code: "BAD_REQUEST",
    });
  }
  if (accountGroupingId && data.title) {
    const acctType = data.type || "Expense";

    const { title, accountGroup, accountGroup2, accountGroup3, ...other } =
      data;
    if (acctType === "Income" || acctType === "Expense") {
      return prisma.transactionAccount.create({
        data: {
          ...other,
          ...basicStatusToDBRequired(data.status || "Active"),
          ...defaultIncExp(title),
          accountGroupingId,
        },
      });
    }

    return prisma.transactionAccount.create({
      data: {
        ...other,
        accountGroupingId,
        ...basicStatusToDB(data.status || "Active"),
        ...createAccountGroupTitle({
          accountGroup,
          accountGroup2,
          accountGroup3,
          title,
        }),
      },
    });
  }
  throw new TRPCError({
    message: "Cannot Create Account Without Account Grouping or Title",
    code: "BAD_REQUEST",
  });
};

import type { Prisma, PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";

import { basicStatusToDBRequired } from "src/utils/validation/basicStatusToDB";
import type { createCategoryValidationType } from "src/utils/validation/category/createCategoryValidation";
import type { updateCategoryDataValidationType } from "src/utils/validation/category/updateCategoryValidation";

import {
  createGroupSingleTitle,
  updateGroupSingleTitle
} from "../groupSingleHandling";
import type { UpsertActions } from "../types";

export type UpsertCategoryData =
  | createCategoryValidationType
  | updateCategoryDataValidationType;

export const upsertCategory = async ({
  data,
  id,
  accountGroupingId,
  userId,
  userAdmin = false,
  prisma,
  action
}: {
  data: UpsertCategoryData;
  id?: string | undefined;
  accountGroupingId?: string;
  userId: string;
  userAdmin?: boolean;
  prisma: PrismaClient | PrismaClient | Prisma.TransactionClient;
  action: UpsertActions;
}) => {
  if (id) {
    const found = await prisma.category.findFirst({
      where: {
        id,
        accountGroupingId,
        ...(!userAdmin
          ? { accountGrouping: { adminUsers: { some: { id: userId } } } }
          : {})
      }
    });
    if (found && action === "Create") {
      throw new TRPCError({
        message: "Category Found But Action Is Only Create, cannot update",
        code: "BAD_REQUEST"
      });
    } else if (found) {
      return prisma.category.update({
        where: { id: found.id },
        data: {
          ...updateGroupSingleTitle({
            group: data.group,
            single: data.single,
            title: "title" in data && data.title ? data.title : undefined,
            existing: found
          }),
          ...(data.status ? basicStatusToDBRequired(data.status) : {})
        }
      });
    }
  }
  if (action === "Update") {
    throw new TRPCError({
      message: "No category found to update",
      code: "BAD_REQUEST"
    });
  }
  if (accountGroupingId && data.group && data.single) {
    return prisma.category.create({
      data: {
        ...createGroupSingleTitle({
          group: data.group,
          single: data.single
        }),
        accountGroupingId,
        ...basicStatusToDBRequired(data.status || "Active")
      }
    });
  }
  throw new TRPCError({
    message: "Cannot Create Category Without Account Grouping, Single Or Group",
    code: "BAD_REQUEST"
  });
};

import type { Prisma, PrismaClient } from "@prisma/client";
import { basicStatusToDBRequired } from "src/utils/validation/basicStatusToDB";
import { TRPCError } from "@trpc/server";
import type { UpsertActions } from "../types";
import {
  createGroupSingleTitle,
  updateGroupSingleTitle,
} from "../groupSingleHandling";
import type { createTagValidationType } from "src/utils/validation/tag/createTagValidation";
import type { updateTagDataValidationType } from "src/utils/validation/tag/updateTagValidation";

export type UpsertTagData =
  | createTagValidationType
  | updateTagDataValidationType;

export const upsertTag = async ({
  data,
  id,
  accountGroupingId,
  userId,
  userAdmin = false,
  prisma,
  action,
}: {
  data: UpsertTagData;
  id?: string | undefined;
  accountGroupingId?: string;
  userId: string;
  userAdmin?: boolean;
  prisma: PrismaClient | PrismaClient | Prisma.TransactionClient;
  action: UpsertActions;
}) => {
  if (id) {
    const found = await prisma.tag.findFirst({
      where: {
        id,
        accountGroupingId,
        ...(!userAdmin
          ? { accountGrouping: { adminUsers: { some: { id: userId } } } }
          : {}),
      },
    });
    if (found && action === "Create") {
      throw new TRPCError({
        message: "Tag Found But Action Is Only Create, cannot update",
        code: "BAD_REQUEST",
      });
    } else if (found) {
      return prisma.tag.update({
        where: { id: found.id },
        data: {
          ...updateGroupSingleTitle({
            group: data.group,
            single: data.single,
            title: "title" in data && data.title ? data.title : undefined,
            existing: found,
          }),
          ...(data.status ? basicStatusToDBRequired(data.status) : {}),
        },
      });
    }
  }
  if (action === "Update") {
    throw new TRPCError({
      message: "No tag found to update",
      code: "BAD_REQUEST",
    });
  }
  if (accountGroupingId && data.group && data.single) {
    return prisma.tag.create({
      data: {
        ...createGroupSingleTitle({
          group: data.group,
          single: data.single,
        }),
        accountGroupingId,
        ...basicStatusToDBRequired(data.status || "Active"),
      },
    });
  }
  throw new TRPCError({
    message: "Cannot Create Tag Without Account Grouping, Single Or Group",
    code: "BAD_REQUEST",
  });
};

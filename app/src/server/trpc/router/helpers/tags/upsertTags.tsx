import type { Prisma, PrismaClient, Tag } from "@prisma/client";
import { type BulkUpgradeAccountGroupingValidationType } from "src/utils/validation/accountGrouping/bulkUpgradeAccountGroupingValidation";
import { type UpsertReturnType } from "../types";
import { upsertTag, type UpsertTagData } from "./upsertTag";

export type UpsertTagsReturnType = UpsertReturnType<Tag>;

export const upsertTags = async ({
  data,
  prisma,
  userId,
  userIsAdmin,
}: {
  data: BulkUpgradeAccountGroupingValidationType;
  prisma: PrismaClient | PrismaClient | Prisma.TransactionClient;
  userId: string;
  userIsAdmin?: boolean;
}): Promise<UpsertTagsReturnType> => {
  const accountGroupingId = data.accountGroupingId;

  const returnData: UpsertTagsReturnType = {
    idLookup: {},
    nameLookup: {},
  };

  const listData: UpsertTagData[] = data.createTagTitles
    ? data.createTagTitles.map((item) => {
        const [single, group] = item.split("/").reverse();
        return { group, single };
      })
    : [];

  const upsertData = data.upsertTags ? data.upsertTags : [];

  const list: (typeof upsertData[0] | UpsertTagData)[] = [
    ...upsertData,
    ...listData,
  ];
  if (list) {
    await Promise.all(
      list.map(async (currentItem) => {
        const upsertedTag = await upsertTag({
          prisma,
          accountGroupingId,
          id:
            "id" in currentItem && currentItem.id ? currentItem.id : undefined,
          data: currentItem,
          userId,
          userAdmin: userIsAdmin,
          action: "Upsert",
        });
        returnData.idLookup[upsertedTag.id] = upsertedTag;
        if ("id" in currentItem && currentItem.id) {
          returnData.idLookup[currentItem.id] = upsertedTag;
        }
        returnData.nameLookup[upsertedTag.title] = upsertedTag;
      })
    );
  }

  return returnData;
};

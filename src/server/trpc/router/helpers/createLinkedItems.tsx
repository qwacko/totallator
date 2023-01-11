import type { Prisma } from "@prisma/client";

import { basicStatusToDBRequired } from "src/utils/validation/basicStatusToDB";

import { createGroupSingleTitle } from "./groupSingleHandling";

export const createLinkedItems = ({
  createTags,
  createCategories,
  createBills,
  createBudgets
}: {
  createTags?: string[] | undefined;
  createCategories?: string[] | undefined;
  createBills?: string[] | undefined;
  createBudgets?: string[] | undefined;
}) => {
  const tagCreationAll: Prisma.TagCreateManyAccountGroupingInput[] = createTags
    ? createTags.map((item) => {
        const [single, group] = item.split("/").reverse();
        return {
          ...basicStatusToDBRequired("Active"),
          ...createGroupSingleTitle({
            group: group || "",
            single: single || ""
          })
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
              single: single || ""
            })
          };
        })
      : [];

  const billCreationAll: Prisma.BillCreateManyAccountGroupingInput[] =
    createBills
      ? createBills.map((item) => {
          return {
            ...basicStatusToDBRequired("Active"),
            title: item
          };
        })
      : [];

  const budgetCreationAll: Prisma.BillCreateManyAccountGroupingInput[] =
    createBudgets
      ? createBudgets.map((item) => {
          return {
            ...basicStatusToDBRequired("Active"),
            title: item
          };
        })
      : [];

  return {
    tagCreationAll,
    categoryCreationAll,
    billCreationAll,
    budgetCreationAll
  };
};

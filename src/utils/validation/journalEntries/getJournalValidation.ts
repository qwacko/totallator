import { z } from "zod";

import { accountFilterNew } from "../account/getAccountInputValidation";
import { billFilter } from "../bill/billFilter";
import { budgetFilter } from "../budget/budgetFilter";
import { categoryFilter } from "../category/categoryFilter";
import { tagFilter } from "../tag/tagFilter";
import { booleanFilter } from "./booleanFilter";
import { dateFilter } from "./dateFilter";
import { idFilter } from "./idFilter";
import { numberFilter } from "./numberFilter";
import { paginationValidation } from "./paginationValidation";
import { stringFilter } from "./stringFilter";

const transactionFilter = z
  .object({
    journalEntries: z
      .object({
        some: z
          .object({
            accountId: idFilter,
            account: accountFilterNew.optional()
          })
          .optional()
      })
      .optional()
  })
  .optional();

export const journalFilter = z.object({
  //Core Data
  id: idFilter,
  date: dateFilter,
  amount: numberFilter,
  description: stringFilter,

  //Status
  dataChecked: booleanFilter,
  complete: booleanFilter,
  reconciled: booleanFilter,
  linked: booleanFilter,

  //Linked Items
  billId: idFilter,
  budgetId: idFilter,
  categoryId: idFilter,
  tagId: idFilter,
  accountId: idFilter,
  accountGroupingId: idFilter,
  primaryJournalId: idFilter,
  transaction: transactionFilter,

  bill: billFilter.optional(),
  budget: budgetFilter.optional(),
  category: categoryFilter.optional(),
  tag: tagFilter.optional(),
  account: accountFilterNew.optional(),

  //Dates
  updatedAt: dateFilter,
  createdAt: dateFilter
});

export type JournalFilterValidationInputType = z.input<typeof journalFilter>;
export type JournalFilterValidation = z.infer<typeof journalFilter>;

const sort = z
  .array(
    z.object({
      key: z.enum([
        "date",
        "description",
        "updatedAt",
        "createdAt",
        "amount",
        "account",
        "category",
        "tag",
        "bill",
        "budget"
      ]),
      direction: z.enum(["asc", "desc"])
    })
  )
  .optional();

export type JournalSortValidation = z.infer<typeof sort>;

export const getJournalValidation = z.object({
  pagination: paginationValidation
    .optional()
    .default({ pageNo: 0, pageSize: 10 }),
  filters: z.array(journalFilter).optional(),
  sort
});

export type GetJournalValidationInput = z.input<typeof getJournalValidation>;

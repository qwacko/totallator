import type { Decimal } from "@prisma/client/runtime";
import { z } from "zod";

import { journalFilter } from "src/utils/validation/journalEntries/getJournalValidation";

import { protectedProcedure, router } from "../trpc";
import { getUserInfo } from "./helpers/getUserInfo";
import { filtersToQuery } from "./helpers/journals/journalsWithStats";

// const groupingOptionsAccount = [
//   "account.title",
//   "account.type",
//   "account.isCash",
//   "account.isNetWorth",
//   "account.accountGroup",
//   "account.accountGroup2",
//   "account.accountGroup3",
//   "account.accountGroupCombined",
//   "account.accountTitleCombined"
// ] as const;

// const groupingOptionsTag = ["tag.title", "tag.group", "tag.single"] as const;
// const groupingOptionsCategory = [
//   "category.title",
//   "category.group",
//   "category.single"
// ] as const;
// const groupingOptionsBill = ["bill.title"] as const;
// const groupingOptionsBudget = ["budget.title"] as const;
// const groupingOptionsJournal = [
//   "journal.date",
//   "journal.month",
//   "journal.year",
//   "journal.description",
//   "journal.linked",
//   "journal.reconciled",
//   "journal.complete",
//   "journal.dataChecked"
// ] as const;
// const groupingOptionsAccountGrouping = ["accountGrouping.title"] as const;

// const combinedGroupingOptions = [
//   ...groupingOptionsAccount,
//   ...groupingOptionsTag,
//   ...groupingOptionsCategory,
//   ...groupingOptionsBill,
//   ...groupingOptionsBudget,
//   ...groupingOptionsAccountGrouping,
//   ...groupingOptionsJournal
// ] as const;

export const summaryRouter = router({
  getTimeData: protectedProcedure
    .input(
      z.object({
        filters: z.array(journalFilter),
        groupingList: z
          .array(
            z.enum([
              "date",
              "accountId",
              "accountGroupingId",
              "tagId",
              "categoryId",
              "billId",
              "budgetId",
              "reconciled",
              "dataChecked",
              "complete"
            ])
          )
          .default(["date"])
      })
    )
    .output(
      z.array(
        z.object({
          _sum: z.object({
            amount: z.number().nullable()
          }),
          _min: z.object({
            date: z.date().nullable(),
            amount: z.number().nullable()
          }),
          _max: z.object({
            date: z.date().nullable(),
            amount: z.number().nullable()
          }),
          _count: z.object({ _all: z.number().nullable() }),
          _accountId: z.string().nullable().optional(),
          _billId: z.string().nullable().optional(),
          _budgetId: z.string().nullable().optional(),
          _categoryId: z.string().nullable().optional(),
          _tagId: z.string().nullable().optional(),
          _accountGroupingId: z.string().nullable().optional()
        })
      )
    )
    .query(async ({ ctx, input }) => {
      const user = await getUserInfo(ctx.session.user.id, ctx.prisma);

      const sumDecimalObjectToNumber = <
        T extends { amount: Decimal | null; [key: string]: unknown }
      >(
        data: T
      ) => {
        const { amount, ...otherData } = data;
        return {
          ...otherData,
          amount: amount === null ? null : amount.toNumber()
        };
      };

      const groupedJournals = (
        await ctx.prisma.journalEntry.groupBy({
          where: {
            AND: await filtersToQuery({
              prisma: ctx.prisma,
              userId: user.id,
              filters: input.filters
            })
          },
          _sum: { amount: true },
          _min: { date: true, amount: true },
          _max: { date: true, amount: true },
          _count: { _all: true },
          by: input.groupingList
        })
      ).map((item) => ({
        ...item,
        _sum: sumDecimalObjectToNumber(item._sum),
        _max: sumDecimalObjectToNumber(item._max),
        _min: sumDecimalObjectToNumber(item._min)
      }));

      return groupedJournals;
    })
});

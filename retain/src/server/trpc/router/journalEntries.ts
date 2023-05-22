import { TRPCError } from "@trpc/server";
import { omit } from "lodash";
import { z } from "zod";

import { env } from "src/env/server.mjs";
import { removeUndefinedAndDuplicates } from "src/utils/arrayHelpers";
import { cloneTransactionInput } from "src/utils/validation/journalEntries/cloneTransactionsValidation";
import {
  createSimpleTransactionValidation,
  createTransactionValidation
} from "src/utils/validation/journalEntries/createJournalValidation";
import { deleteTransactionInput } from "src/utils/validation/journalEntries/deleteTransactionsValidation";
import { getJournalValidation } from "src/utils/validation/journalEntries/getJournalValidation";
import { journalEntryGetValidation } from "src/utils/validation/journalEntries/readJournalEntriesValidation";
import { updateJournalInput } from "src/utils/validation/journalEntries/updateJournalValidation";

import { protectedProcedure, router } from "../trpc";
import { getUserInfo } from "./helpers/getUserInfo";
import { checkTransactions } from "./helpers/journals/checkTransactions";
import { createSimpleTranasction } from "./helpers/journals/createSimpleTranasction";
import { createTransaction } from "./helpers/journals/createTransaction";
import {
  filtersToQuery,
  journalsWithStats
} from "./helpers/journals/journalsWithStats";
import { journalSortToOrderBy } from "./helpers/journals/sortToOrderBy";
import {
  updateAllDateInfo,
  updateDateInfo
} from "./helpers/journals/updateDateInfo";
import { updateSingleJournal } from "./helpers/journals/updateSingleJournal";

export const journalsRouter = router({
  getSelectionInfo: protectedProcedure
    .input(
      getJournalValidation.omit({ pagination: true, sort: true }).merge(
        z.object({
          type: z.enum([
            "All",
            "Incomplete",
            "Complete",
            "Reconciled",
            "Unreconciled",
            "DataChecked",
            "NotDataChecked"
          ])
        })
      )
    )
    .query(async ({ ctx, input }) => {
      const user = await getUserInfo(ctx.session.user.id, ctx.prisma);

      const journals = await ctx.prisma.journalEntry.findMany({
        where: {
          AND: [
            ...(await filtersToQuery({
              prisma: ctx.prisma,
              user: user,
              filters: input.filters
            })),
            input.type === "Complete"
              ? { complete: true }
              : input.type === "Incomplete"
              ? { complete: false }
              : input.type === "Reconciled"
              ? { reconciled: true, complete: false }
              : input.type === "Unreconciled"
              ? { reconciled: false, complete: false }
              : input.type === "DataChecked"
              ? { dataChecked: true, complete: false }
              : input.type === "NotDataChecked"
              ? { dataChecked: false, complete: false }
              : {}
          ]
        },
        select: { id: true, complete: true, accountGroupingId: true }
      });

      const accountGroupingIds = removeUndefinedAndDuplicates(
        journals.map((item) => item.accountGroupingId)
      );

      const hasComplete = removeUndefinedAndDuplicates(
        journals.map((item) => item.complete)
      ).includes(true);

      return {
        ids: journals.map((item) => item.id),
        accountGroupingIds,
        hasComplete
      };
    }),
  get: protectedProcedure
    .input(getJournalValidation)
    .output(journalEntryGetValidation)
    .query(async ({ ctx, input }) => {
      const user = await getUserInfo(ctx.session.user.id, ctx.prisma);

      //Sorting
      const orderBy = journalSortToOrderBy(input.sort);

      //Pagination
      const take = input.pagination.pageSize;
      const skip = input.pagination.pageNo * input.pagination.pageSize;

      const { dataWithTotal: journals, count } = await journalsWithStats({
        prisma: ctx.prisma,
        orderBy,
        take,
        skip,
        filters: input.filters,
        user: user
      });

      const returnJournals = journals.map((journal) => {
        const { accountGrouping, transaction, ...pickedJournal } = journal;
        const userIsAdmin =
          user.admin ||
          accountGrouping.adminUsers.map((item) => item.id).includes(user.id);

        const otherJournals = transaction["journalEntries"].map(
          (otherJournal) => {
            return {
              id: otherJournal.id,
              accountId: otherJournal.accountId,
              amount: otherJournal.amount.toNumber()
            };
          }
        );
        return {
          ...omit(pickedJournal, [
            "year",
            "yearMonth",
            "yearMonthDay",
            "yearQuarter",
            "yearWeek"
          ]),
          amount: pickedJournal.amount.toNumber(),
          otherJournals,
          userIsAdmin
        };
      });

      return { data: returnJournals, count };
    }),
  createSimpleTransaction: protectedProcedure
    .input(createSimpleTransactionValidation)
    .mutation(async ({ ctx, input }) => {
      const user = await getUserInfo(ctx.session.user.id, ctx.prisma);

      // Build up the transaction information / details from the provided information
      await createSimpleTranasction({ input, user, prisma: ctx.prisma });
      return true;
    }),
  createTransaction: protectedProcedure
    .input(createTransactionValidation)
    .mutation(async ({ ctx, input }) => {
      const user = await getUserInfo(ctx.session.user.id, ctx.prisma);
      await createTransaction({ user, prisma: ctx.prisma, input });
      return true;
    }),
  updateDateInfo: protectedProcedure.query(async ({ ctx }) => {
    updateAllDateInfo(ctx.prisma);
  }),
  updateJournals: protectedProcedure
    .input(updateJournalInput)
    .mutation(async ({ ctx, input }) => {
      const user = await getUserInfo(ctx.session.user.id, ctx.prisma);

      await updateDateInfo(ctx.prisma);

      const { data, count } = await journalsWithStats({
        prisma: ctx.prisma,
        take: input.maxUpdated + 1,
        skip: 0,
        filters: input.filters,
        user: user
      });

      //Handle Other items
      const otherIds = input.data.otherJournals
        ? input.data.otherJournals.map((item) => item.id)
        : [];
      const amountInOtherJournals = input.data.otherJournals
        ? input.data.otherJournals
            .map((item) => item.amount)
            .reduce(
              (prev, current) => (current !== undefined ? true : prev),
              false
            )
        : false;
      const amountInCoreJournal = input.data.amount !== undefined;
      const updateOtherAmounts = amountInCoreJournal
        ? !amountInOtherJournals
        : amountInOtherJournals;

      const { data: otherData } = await journalsWithStats({
        prisma: ctx.prisma,
        take: input.maxUpdated + 1,
        skip: 0,
        filters: [{ id: { in: otherIds } }],
        user: user
      });

      if (count > input.maxUpdated) {
        throw new TRPCError({
          message: `Max number updated journals (${input.maxUpdated} exceeded.`,
          code: "BAD_REQUEST"
        });
      }

      await ctx.prisma.$transaction(
        async (prisma) => {
          await Promise.all(
            data.map(async (journal) => {
              await updateSingleJournal({
                prisma,
                journal,
                data: input.data,
                dontUpdateOtherAmounts: !updateOtherAmounts,
                updateCompleted: input.updateCompleteJournals
              });

              //Update the referenced other journal information
              await Promise.all(
                otherData.map(async (journal) => {
                  if (input.data.otherJournals) {
                    const targetData = input.data.otherJournals.find(
                      (item) => item.id === journal.id
                    );
                    if (targetData) {
                      const otherJournalData = omit(targetData, ["id"]);
                      await updateSingleJournal({
                        prisma,
                        journal,
                        data: otherJournalData,
                        dontUpdateOtherAmounts: !updateOtherAmounts,
                        updateCompleted: input.updateCompleteJournals
                      });
                    }
                  }
                })
              );
            })
          );

          //Check Transactions
          await checkTransactions({
            prisma,
            transactionIds: data.map((item) => item.transactionId)
          });
        },
        { timeout: env.BULK_TIMEOUT }
      );
    }),
  cloneTransactions: protectedProcedure
    .input(cloneTransactionInput)
    .mutation(async ({ ctx, input }) => {
      const user = await getUserInfo(ctx.session.user.id, ctx.prisma);

      const transactions = await ctx.prisma.transaction.findMany({
        where: {
          AND: [
            {
              OR: removeUndefinedAndDuplicates([
                input.ids
                  ? {
                      id: { in: input.ids }
                    }
                  : undefined,
                input.journalIds
                  ? {
                      journalEntries: { some: { id: { in: input.journalIds } } }
                    }
                  : undefined
              ])
            },
            {
              journalEntries: {
                some: {
                  accountGrouping: { adminUsers: { some: { id: user.id } } }
                }
              }
            }
          ]
        },
        include: { journalEntries: true }
      });

      if (transactions.length > input.maxUpdated) {
        throw new TRPCError({
          message: `Number of Transactions Exceeds Max Updated (${input.maxUpdated})`,
          code: "FORBIDDEN"
        });
      }
      if (transactions.length === 0) {
        throw new TRPCError({
          message: `No Matching Transactions Found Or User Doesn't Have Admin Permissions`,
          code: "NOT_FOUND"
        });
      }

      await ctx.prisma.$transaction(async (prismaClient) => {
        const expandedTransactions: (typeof transactions)[] = new Array(
          input.cloneCount
        ).fill(transactions);
        const flattened = expandedTransactions.reduce((prev, current) => {
          return [...prev, ...current];
        }, []);

        const createdTransactions = await Promise.all(
          flattened.map(async (transaction) => {
            const newJournals = transaction.journalEntries.map((journal) => {
              const journalSelected = omit(
                journal,
                "complete",
                "id",
                "reconciled",
                "createdAt",
                "updatedAt",
                "dataChecked",
                "transactionId"
              );
              return {
                ...journalSelected,
                complete: false,
                description: journalSelected.description
              };
            });

            return prismaClient.transaction.create({
              data: { journalEntries: { createMany: { data: newJournals } } }
            });
          })
        );

        await checkTransactions({
          prisma: prismaClient,
          transactionIds: createdTransactions.map((item) => item.id)
        });
      });

      return true;
    }),
  deleteTransactions: protectedProcedure
    .input(deleteTransactionInput)
    .mutation(async ({ ctx, input }) => {
      const user = await getUserInfo(ctx.session.user.id, ctx.prisma);

      const transactions = await ctx.prisma.transaction.findMany({
        where: {
          AND: [
            {
              OR: removeUndefinedAndDuplicates([
                input.ids
                  ? {
                      id: { in: input.ids }
                    }
                  : undefined,
                input.journalIds
                  ? {
                      journalEntries: { some: { id: { in: input.journalIds } } }
                    }
                  : undefined
              ])
            },
            {
              journalEntries: {
                some: {
                  accountGrouping: { adminUsers: { some: { id: user.id } } }
                },
                every: input.canDeleteComplete
                  ? undefined
                  : {
                      complete: false
                    }
              }
            }
          ]
        },
        include: { journalEntries: true }
      });

      if (transactions.length > input.maxDeleted) {
        throw new TRPCError({
          message: `Number of Transactions Exceeds Max Deleted (${input.maxDeleted})`,
          code: "FORBIDDEN"
        });
      }
      if (transactions.length === 0) {
        throw new TRPCError({
          message: `No Matching${
            input.canDeleteComplete ? "" : " Incomplete"
          } Transactions Found Or User Doesn't Have Admin Permissions`,
          code: "NOT_FOUND"
        });
      }

      const transactionIds = transactions.map((trans) => trans.id);

      //Related Journal Entries are deleted through cascade deletes
      await ctx.prisma.transaction.deleteMany({
        where: { id: { in: transactionIds } }
      });

      return true;
    })
});

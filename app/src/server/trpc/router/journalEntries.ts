import {
  createSimpleTransactionValidation,
  createTransactionValidation,
} from "src/utils/validation/journalEntries/createJournalValidation";
import { getJournalValidation } from "src/utils/validation/journalEntries/getJournalValidation";
import { router, protectedProcedure } from "../trpc";
import { createTransaction } from "./helpers/journals/createTransaction";
import { getUserInfo } from "./helpers/getUserInfo";
import { journalsWithStats } from "./helpers/journals/journalsWithStats";
import { updateJournalInput } from "src/utils/validation/journalEntries/updateJournalValidation";
import { TRPCError } from "@trpc/server";
import { checkTransactions } from "./helpers/journals/checkTransactions";
import { updateSingleJournal } from "./helpers/journals/updateSingleJournal";
import { sortToOrderBy } from "./helpers/journals/sortToOrderBy";
import { omit } from "lodash";
import { cloneTransactionInput } from "src/utils/validation/journalEntries/cloneTransactionsValidation";
import { deleteTransactionInput } from "src/utils/validation/journalEntries/deleteTransactionsValidation";
import { createSimpleTranasction } from "./helpers/journals/createSimpleTranasction";

export const journalsRouter = router({
  get: protectedProcedure
    .input(getJournalValidation)
    .query(async ({ ctx, input }) => {
      const user = await getUserInfo(ctx.session.user.id, ctx.prisma);

      //Sorting
      const orderBy = sortToOrderBy(input.sort);

      //Pagination
      const take = input.pagination.pageSize;
      const skip = input.pagination.pageNo * input.pagination.pageSize;

      const { dataWithTotal: journals, count } = await journalsWithStats({
        prisma: ctx.prisma,
        orderBy,
        take,
        skip,
        filters: input.filters,
        userId: user.id,
      });

      const returnJournals = journals.map((journal) => {
        const { accountGrouping, transaction, ...pickedJournal } = journal;
        const userIsAdmin =
          user.admin ||
          accountGrouping.adminUsers.map((item) => item.id).includes(user.id);

        const otherJournals = transaction["journalEntries"].map(
          (otherJournal) => ({
            id: otherJournal.id,
            accountId: otherJournal.accountId,
            amount: otherJournal.amount.toNumber(),
          })
        );

        return {
          ...pickedJournal,
          amount: pickedJournal.amount.toNumber(),
          otherJournals,
          userIsAdmin,
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
  updateJournals: protectedProcedure
    .input(updateJournalInput)
    .mutation(async ({ ctx, input }) => {
      const user = await getUserInfo(ctx.session.user.id, ctx.prisma);

      const { data, count } = await journalsWithStats({
        prisma: ctx.prisma,
        take: input.maxUpdated + 1,
        skip: 0,
        filters: input.filters,
        userId: user.id,
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
        userId: user.id,
      });

      if (count > input.maxUpdated) {
        throw new TRPCError({
          message: `Max number updated journals (${input.maxUpdated} exceeded.`,
          code: "BAD_REQUEST",
        });
      }

      await ctx.prisma.$transaction(async (prisma) => {
        await Promise.all(
          data.map(async (journal) => {
            await updateSingleJournal({
              prisma,
              journal,
              data: input.data,
              dontUpdateOtherAmounts: !updateOtherAmounts,
              updateCompleted: input.updateCompleteJournals,
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
                      updateCompleted: input.updateCompleteJournals,
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
          transactionIds: data.map((item) => item.transactionId),
        });
      });
    }),
  cloneTransactions: protectedProcedure
    .input(cloneTransactionInput)
    .mutation(async ({ ctx, input }) => {
      const user = await getUserInfo(ctx.session.user.id, ctx.prisma);

      const transactions = await ctx.prisma.transaction.findMany({
        where: {
          id: { in: input.ids },
          journalEntries: {
            some: {
              accountGrouping: { adminUsers: { some: { id: user.id } } },
            },
          },
        },
        include: { journalEntries: true },
      });

      if (transactions.length > input.maxUpdated) {
        throw new TRPCError({
          message: `Number of Transactions Exceeds Max Updated (${input.maxUpdated})`,
          code: "FORBIDDEN",
        });
      }
      if (transactions.length === 0) {
        throw new TRPCError({
          message: `No Matching Transactions Found Or User Doesn't Have Admin Permissions`,
          code: "NOT_FOUND",
        });
      }

      await ctx.prisma.$transaction(async (prismaClient) => {
        const expandedTransactions: typeof transactions[] = new Array(
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
                description: `${journalSelected.description} (Clone)`,
              };
            });

            return prismaClient.transaction.create({
              data: { journalEntries: { createMany: { data: newJournals } } },
            });
          })
        );

        await checkTransactions({
          prisma: prismaClient,
          transactionIds: createdTransactions.map((item) => item.id),
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
          id: { in: input.ids },
          journalEntries: {
            some: {
              accountGrouping: { adminUsers: { some: { id: user.id } } },
            },
            every: input.canDeleteComplete
              ? undefined
              : {
                  complete: false,
                },
          },
        },
        include: { journalEntries: true },
      });

      if (transactions.length > input.maxDeleted) {
        throw new TRPCError({
          message: `Number of Transactions Exceeds Max Deleted (${input.maxDeleted})`,
          code: "FORBIDDEN",
        });
      }
      if (transactions.length === 0) {
        throw new TRPCError({
          message: `No Matching${
            input.canDeleteComplete ? "" : " Incomplete"
          } Transactions Found Or User Doesn't Have Admin Permissions`,
          code: "NOT_FOUND",
        });
      }

      const transactionIds = transactions.map((trans) => trans.id);

      //Related Journal Entries are deleted through cascade deletes
      await ctx.prisma.transaction.deleteMany({
        where: { id: { in: transactionIds } },
      });

      return true;
    }),
});

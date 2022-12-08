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
import { z } from "zod";
import { cloneTransactionInput } from "src/utils/validation/journalEntries/cloneTransactionsValidation";

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
            amount: otherJournal.amount,
          })
        );

        return { ...pickedJournal, otherJournals, userIsAdmin };
      });

      return { data: returnJournals, count };
    }),
  createSimpleTransaction: protectedProcedure
    .input(createSimpleTransactionValidation)
    .mutation(async ({ ctx, input }) => {
      const user = await getUserInfo(ctx.session.user.id, ctx.prisma);

      // Build up the transaction information / details from the provided information
      const { fromAccountId, toAccountId, amount, ...sharedProperties } = input;
      const fromTransaction = {
        ...sharedProperties,
        accountId: fromAccountId,
        amount: -1 * amount,
        linked: true,
      };
      const toTransaction = {
        ...sharedProperties,
        accountId: toAccountId,
        amount: 1 * amount,
        linked: true,
      };

      const transaction = [fromTransaction, toTransaction];

      const transactionValidated =
        createTransactionValidation.parse(transaction);
      await createTransaction({
        user,
        prisma: ctx.prisma,
        input: transactionValidated,
      });
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

      console.log("Other Amount Updates", {
        amountInOtherJournals,
        amountInCoreJournal,
        updateOtherAmounts,
      });
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
          message: `No Matching Transaction Found Or User Doesn't Have Admin Permissions`,
          code: "NOT_FOUND",
        });
      }

      await ctx.prisma.$transaction(async (prismaClient) => {
        await Promise.all(
          transactions.map(async (transaction) => {
            const newJournals = transaction.journalEntries.map((journal) => {
              const {
                complete,
                id,
                reconciled,
                createdAt,
                updatedAt,
                dataChecked,
                transactionId,
                ...journalSelected
              } = journal;
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
      });

      return true;
    }),
});

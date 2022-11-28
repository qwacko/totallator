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
            accountId: otherJournal.id,
            this: otherJournal.id === journal.id,
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
      if (count > input.maxUpdated) {
        throw new TRPCError({
          message: `Max number updated journals (${input.maxUpdated} exceeded.`,
          code: "BAD_REQUEST",
        });
      }

      await ctx.prisma.$transaction(async (prisma) => {
        await Promise.all(
          data.map(async (journal) =>
            updateSingleJournal({ prisma, journal, data: input.data })
          )
        );

        //Check Transactions
        await checkTransactions({
          prisma,
          transactionIds: data.map((item) => item.transactionId),
        });
      });
    }),
});

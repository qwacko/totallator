import type { Prisma } from "@prisma/client";
import {
  createSimpleTransactionValidation,
  createTransactionValidation,
} from "src/utils/validation/journalEntries/createJournalValidation";
import {
  getJournalValidation,
  type JournalSortValidation,
} from "src/utils/validation/journalEntries/getJournalValidation";
import { router, protectedProcedure } from "../trpc";
import { createTransaction } from "./helpers/journals/createTransaction";
import { getUserInfo } from "./helpers/getUserInfo";
import { journalsWithStats } from "./helpers/journals/journalsWithStats";

const sortToOrderBy = (
  input: JournalSortValidation
): Prisma.JournalEntryOrderByWithAggregationInput[] | undefined => {
  if (!input) {
    return undefined;
  }

  return input.map((sort) => {
    if (sort.key === "date") {
      return { date: sort.direction };
    }
    if (sort.key === "description") {
      return { description: sort.direction };
    }
    if (sort.key === "createdAt") {
      return { createdAt: sort.direction };
    }
    if (sort.key === "updatedAt") {
      return { updatedAt: sort.direction };
    }
    if (sort.key === "amount") {
      return { amount: sort.direction };
    }

    return {};
  });
};

export const journalsRouter = router({
  get: protectedProcedure
    .input(getJournalValidation)
    .query(async ({ ctx, input }) => {
      const user = await getUserInfo(ctx.session.user.id, ctx.prisma);

      //Sorting
      const orderBy = sortToOrderBy(input.sort);

      //Pagination
      const take = input.pagination.pageSize;
      const skip = input.pagination.pageNo * input.pagination?.pageSize;

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
});

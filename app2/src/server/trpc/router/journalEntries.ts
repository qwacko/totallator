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

    return {};
  });
};

export const journalsRouter = router({
  get: protectedProcedure
    .input(getJournalValidation)
    .query(async ({ ctx, input }) => {
      const user = await getUserInfo(ctx.session.user.id, ctx.prisma);

      const journals = await ctx.prisma.journalEntry.findMany({
        where: {
          AND: [
            ...(input.filters ? input.filters : []),
            {
              accountGrouping: { viewUsers: { some: { id: user.id } } },
            },
          ],
        },
        include: {
          accountGrouping: { include: { viewUsers: true, adminUsers: true } },
          transaction: { select: { journalEntries: true } },
        },
        orderBy: sortToOrderBy(input.sort),
      });

      return journals.map((journal) => {
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

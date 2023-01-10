import {
  type createSimpleTransactionValidationType,
  createTransactionValidation,
} from "src/utils/validation/journalEntries/createJournalValidation";
import { createTransaction } from "./createTransaction";
import type { Prisma, PrismaClient, User } from "@prisma/client";

export const createSimpleTranasction = async ({
  input,
  user,
  prisma,
}: {
  input: createSimpleTransactionValidationType;
  user: User;
  prisma: PrismaClient | Prisma.TransactionClient;
}) => {
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

  const transactionValidated = createTransactionValidation.parse(transaction);
  await createTransaction({
    user,
    prisma: prisma,
    input: transactionValidated,
  });
};

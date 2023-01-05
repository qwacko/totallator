import type { Prisma, PrismaClient, User } from "@prisma/client";
import { TRPCError } from "@trpc/server";

export const checkAccountGroupingAccess = async ({
  accountGroupingId,
  prisma,
  user,
  adminRequired = true,
}: {
  accountGroupingId: string;
  prisma: PrismaClient | Prisma.TransactionClient;
  user: User;
  adminRequired?: boolean;
}) => {
  console.log("Checking Account Grouping Access");
  const targetAccountGrouping = await prisma.accountGrouping.findFirst({
    where: {
      id: accountGroupingId,
      ...(user.admin
        ? {}
        : adminRequired
        ? { adminUsers: { some: { id: user.id } } }
        : { viewUsers: { some: { id: user.id } } }),
    },
  });

  if (!targetAccountGrouping) {
    throw new TRPCError({
      message: "No Account Grouping Found Or No Permission To Update",
      code: "BAD_REQUEST",
    });
  }
  console.log("Account Grouping Access Success");
};

export const accountGroupingFilter = (userId: string, admin = true) => {
  if (admin) {
    return {
      accountGrouping: { adminUsers: { some: { id: userId } } },
    } as const;
  }

  return { accountGrouping: { viewUsers: { some: { id: userId } } } } as const;
};

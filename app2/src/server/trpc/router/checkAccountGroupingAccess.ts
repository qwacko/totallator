import { PrismaClient, User } from "@prisma/client";
import { TRPCError } from "@trpc/server";

export const checkAccountGroupingAccess = async ({
  accountGroupingId,
  prisma,
  user,
  adminRequired = true,
}: {
  accountGroupingId: string;
  prisma: PrismaClient;
  user: User;
  adminRequired?: boolean;
}) => {
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
};

import { TRPCError } from "@trpc/server";
import { PrismaClient } from "@prisma/client";

export const getUserInfo = async (
  userId: string,
  prismaClient: PrismaClient
) => {
  const returnUser = await prismaClient.user.findFirst({
    where: { id: userId },
  });

  if (!returnUser) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "User Not Found",
    });
  }

  return returnUser;
};

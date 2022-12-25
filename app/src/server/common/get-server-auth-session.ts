// Wrapper for unstable_getServerSession https://next-auth.js.org/configuration/nextjs

import type { GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions as nextAuthOptions } from "src/pages/api/auth/[...nextauth]";
import type { GetServerSideProps } from "next";

// Next API route example - /pages/api/restricted.ts
export const getServerAuthSession = async (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return await unstable_getServerSession(ctx.req, ctx.res, nextAuthOptions);
};
export const getServerSidePropsPrivate: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: "/user/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};

export const getServerSidePropsNotLoggedIn: GetServerSideProps = async (
  ctx
) => {
  const session = await getServerAuthSession(ctx);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";

import { type AppRouterOutputs } from "src/server/trpc/router/_app";
import { trpc } from "src/utils/trpc";
import {
  dateFormatter,
  dayjsFormatter
} from "src/utils/validation/user/dateFormats";

import { useUpdateUser } from "./useUpdateUser";

type UserType = AppRouterOutputs["user"]["get"];

export const UserContext = React.createContext<UserType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: user, refetch } = trpc.user.get.useQuery();
  const { status } = useSession();

  useEffect(() => {
    refetch();
  }, [status, refetch]);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useLoggedInUser = () => {
  const router = useRouter();
  const data = useContext(UserContext);
  const { updateUser, isUpdatingUser } = useUpdateUser();

  const userSignOut = () => {
    signOut();
    router.push("/user/signin");
  };

  const dateFormat = data?.dateFormat
    ? dateFormatter(data.dateFormat)
    : "yyyyMMdd";

  const dayjsFormat = data?.dateFormat
    ? dayjsFormatter(data.dateFormat)
    : "yyyyMMdd";

  return {
    user: data,
    dateFormat,
    dayjsFormat,
    isLoading: data === undefined,
    updateUser,
    isUpdatingUser,
    signOut: userSignOut
  };
};

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { trpc } from "src/utils/trpc";
import { useUpdateUser } from "./useUpdateUser";

export const useLoggedInUser = () => {
  const router = useRouter();
  const { data, isLoading, refetch } = trpc.user.get.useQuery();
  const { updateUser, isUpdatingUser } = useUpdateUser();
  const { status } = useSession();

  useEffect(() => {
    refetch();
  }, [status, refetch]);

  const userSignOut = () => {
    signOut();
    router.push("/user/signin");
  };

  return {
    status,
    user: data,
    isLoading,
    updateUser,
    isUpdatingUser,
    signOut: userSignOut,
  };
};

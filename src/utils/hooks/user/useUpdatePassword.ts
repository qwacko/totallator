import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

import { trpc } from "src/utils/trpc";

import { notifyTemplate } from "../notifyTemplate";

const id = "useUpdatePassword";
const notifications = notifyTemplate(id, "Password", "Update");

export const useUpdatePassword = ({
  onComplete
}: {
  onComplete?: () => void;
}) => {
  const router = useRouter();
  const utils = trpc.useContext();
  const { mutate: updateUser, isLoading } =
    trpc.user.updatePassword.useMutation({
      onMutate: notifications.onLoading,
      onError: notifications.onError,
      onSuccess: () => {
        notifications.onSuccess();
        onComplete && onComplete();
        signOut();
        utils.invalidate();
        router.push("/user/signin");
      }
    });

  return { updateUser, isUpdatingUser: isLoading };
};

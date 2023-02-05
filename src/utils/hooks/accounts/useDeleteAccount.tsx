import { trpc } from "src/utils/trpc";

import { notifyTemplate } from "../notifyTemplate";

const id = "useDeleteAccount";
const notifications = notifyTemplate(id, "Account", "Delete");

export const useDeleteAccount = ({ id }: { id: string }) => {
  const utils = trpc.useContext();
  const { mutate, isLoading: isMutating } = trpc.accounts.delete.useMutation({
    onError: (e) => {
      utils.accounts.invalidate();
      notifications.onError(e);
    },
    onSuccess: () => {
      utils.accounts.invalidate();
      notifications.onSuccess();
    },
    onMutate: () => {
      notifications.onLoading();
    }
  });

  const del = () => {
    mutate({ id });
  };

  return {
    isMutating,
    mutate,
    del
  };
};

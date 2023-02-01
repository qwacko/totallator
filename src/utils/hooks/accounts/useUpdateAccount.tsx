import { trpc } from "src/utils/trpc";

import { notifyTemplate } from "../notifyTemplate";

const id = "useUpdateAccount";
const notifications = notifyTemplate(id, "Account", "Update");

export const useUpdateAccount = () => {
  const utils = trpc.useContext();
  const { mutate, isLoading: isMutating } = trpc.accounts.update.useMutation({
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

  return {
    isMutating,
    mutate
  };
};

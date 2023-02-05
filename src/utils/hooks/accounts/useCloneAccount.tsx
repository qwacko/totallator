import { trpc } from "src/utils/trpc";

import { notifyTemplate } from "../notifyTemplate";

const id = "useCloneAccount";
const notifications = notifyTemplate(id, "Account", "Clone");

export const useCloneAccount = ({ id }: { id: string }) => {
  const utils = trpc.useContext();
  const { mutate, isLoading: isMutating } = trpc.accounts.clone.useMutation({
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

  const clone = () => {
    mutate({ id });
  };

  return {
    isMutating,
    mutate,
    clone
  };
};

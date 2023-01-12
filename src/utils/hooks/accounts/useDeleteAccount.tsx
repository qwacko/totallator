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
    onMutate: (data) => {
      notifications.onLoading();
      const currentAccounts = utils.accounts.get.getData();
      if (currentAccounts) {
        const targetAccount = currentAccounts.find(
          (item) => item.id === data.id
        );
        if (targetAccount && targetAccount._count.journalEntries === 0) {
          utils.accounts.get.setData(
            undefined,
            currentAccounts.filter((item) => item.id !== data.id)
          );
        }
      }
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

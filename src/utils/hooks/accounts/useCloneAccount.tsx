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
    onMutate: (data) => {
      notifications.onLoading();
      const currentAccounts = utils.accounts.getDropdown.getData();
      if (currentAccounts) {
        const targetAccount = currentAccounts.find(
          (item) => item.id === data.id
        );
        if (targetAccount) {
          utils.accounts.getDropdown.setData(undefined, [
            ...currentAccounts,
            {
              ...targetAccount,
              id: "new",
              title: `${targetAccount.title} (Clone)`,
              accountTitleCombined: `${targetAccount.accountTitleCombined} (Clone)`,
              createdAt: new Date(),
              updatedAt: new Date()
            }
          ]);
        }
      }
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

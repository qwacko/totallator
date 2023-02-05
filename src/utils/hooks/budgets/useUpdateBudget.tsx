import { trpc } from "src/utils/trpc";

import { notifyTemplate } from "../notifyTemplate";

const id = "useCreateBudget";
const notifications = notifyTemplate(id, "Budget", "Update");

export const useUpdateBudget = () => {
  const utils = trpc.useContext();
  const { mutate, isLoading: isMutating } = trpc.budgets.update.useMutation({
    onError: (e) => {
      utils.budgets.invalidate();
      notifications.onError(e);
    },
    onSuccess: () => {
      utils.budgets.invalidate();
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

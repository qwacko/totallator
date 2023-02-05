import { trpc } from "src/utils/trpc";

import { notifyTemplate } from "../notifyTemplate";

const id = "useDeleteBudget";
const notifications = notifyTemplate(id, "Budget", "Delete");

export const useDeleteBudget = ({ id }: { id: string }) => {
  const utils = trpc.useContext();
  const targetUtils = utils.budgets;
  const targetRouter = trpc.budgets;
  const { mutate, isLoading: isMutating } = targetRouter.delete.useMutation({
    onError: (e) => {
      targetUtils.invalidate();
      notifications.onError(e);
    },
    onSuccess: () => {
      targetUtils.invalidate();
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

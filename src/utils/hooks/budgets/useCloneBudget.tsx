import { trpc } from "src/utils/trpc";

import { notifyTemplate } from "../notifyTemplate";

const id = "useCloneBudget";
const notifications = notifyTemplate(id, "Budget", "Clone");

export const useCloneBudget = ({ id }: { id: string }) => {
  const utils = trpc.useContext();
  const targetRouter = trpc.budgets;
  const targetUtils = utils.budgets;
  const { mutate, isLoading: isMutating } = targetRouter.clone.useMutation({
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

  const clone = () => {
    mutate({ id });
  };

  return {
    isMutating,
    mutate,
    clone
  };
};

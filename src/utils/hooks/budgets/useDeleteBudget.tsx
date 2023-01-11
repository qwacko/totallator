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
    onMutate: (data) => {
      notifications.onLoading();
      const current = targetUtils.get.getData();
      if (current) {
        const target = current.find((item) => item.id === data.id);
        if (target && target._count.journalEntries === 0) {
          targetUtils.get.setData(
            current.filter((item) => item.id !== data.id)
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

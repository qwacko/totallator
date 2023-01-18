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
    onMutate: (data) => {
      notifications.onLoading();
      const current = targetUtils.get.getData();
      if (current) {
        const target = current.find((item) => item.id === data.id);
        if (target) {
          targetUtils.get.setData(undefined, [
            ...current,
            {
              ...target,
              id: "new",
              title: `${target.title} (Clone)`,
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

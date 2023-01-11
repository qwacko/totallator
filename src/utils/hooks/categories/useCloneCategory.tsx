import { trpc } from "src/utils/trpc";

import { notifyTemplate } from "../notifyTemplate";

const id = "useCloneCategory";
const notifications = notifyTemplate(id, "Category", "Clone");

export const useCloneCategory = ({ id }: { id: string }) => {
  const utils = trpc.useContext();
  const targetRouter = trpc.categories;
  const targetUtils = utils.categories;
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
          targetUtils.get.setData([
            ...current,
            {
              ...target,
              id: "new",
              title: `${target.title} (Clone)`,
              single: `${target.single} (Clone)`,
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

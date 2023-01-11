import { trpc } from "src/utils/trpc";

import { notifyTemplate } from "../notifyTemplate";

const id = "useCloneTag";
const notifications = notifyTemplate(id, "Tag", "Clone");

export const useCloneTag = ({ id }: { id: string }) => {
  const utils = trpc.useContext();
  const targetRouter = trpc.tags;
  const targetUtils = utils.tags;
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

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

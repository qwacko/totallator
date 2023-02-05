import { trpc } from "src/utils/trpc";

import { notifyTemplate } from "../notifyTemplate";

const id = "useUpdateTag";
const notifications = notifyTemplate(id, "Tag", "Update");

export const useUpdateTag = () => {
  const utils = trpc.useContext();
  const { mutate, isLoading: isMutating } = trpc.tags.update.useMutation({
    onError: (e) => {
      utils.tags.invalidate();
      notifications.onError(e);
    },
    onSuccess: () => {
      utils.tags.invalidate();
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

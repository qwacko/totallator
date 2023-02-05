import { trpc } from "src/utils/trpc";

import { notifyTemplate } from "../notifyTemplate";

const id = "useUpdateCategory";
const notifications = notifyTemplate(id, "Category", "Update");

export const useUpdateCategory = () => {
  const utils = trpc.useContext();
  const { mutate, isLoading: isMutating } = trpc.categories.update.useMutation({
    onError: (e) => {
      utils.categories.invalidate();
      notifications.onError(e);
    },
    onSuccess: () => {
      utils.categories.invalidate();
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

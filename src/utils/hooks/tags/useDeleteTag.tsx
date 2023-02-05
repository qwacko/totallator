import { trpc } from "src/utils/trpc";

import { notifyTemplate } from "../notifyTemplate";

const id = "useDeleteTag";
const notifications = notifyTemplate(id, "Tag", "Delete");

export const useDeleteTag = ({ id }: { id: string }) => {
  const utils = trpc.useContext();
  const targetUtils = utils.tags;
  const targetRouter = trpc.tags;
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

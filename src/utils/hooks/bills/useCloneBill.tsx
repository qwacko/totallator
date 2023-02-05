import { trpc } from "src/utils/trpc";

import { notifyTemplate } from "../notifyTemplate";

const id = "useCloneBill";
const notifications = notifyTemplate(id, "Bill", "Clone");

export const useCloneBill = ({ id }: { id: string }) => {
  const utils = trpc.useContext();
  const targetRouter = trpc.bills;
  const targetUtils = utils.bills;
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

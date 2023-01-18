import { trpc } from "src/utils/trpc";

import { notifyTemplate } from "../notifyTemplate";

const id = "useDeleteBill";
const notifications = notifyTemplate(id, "Bill", "Delete");

export const useDeleteBill = ({ id }: { id: string }) => {
  const utils = trpc.useContext();
  const targetUtils = utils.bills;
  const targetRouter = trpc.bills;
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
            undefined,
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

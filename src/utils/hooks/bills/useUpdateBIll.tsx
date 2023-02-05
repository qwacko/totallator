import { trpc } from "src/utils/trpc";

import { notifyTemplate } from "../notifyTemplate";

const id = "useUpdateBill";
const notifications = notifyTemplate(id, "Bill", "Update");

export const useUpdateBill = () => {
  const utils = trpc.useContext();
  const { mutate, isLoading: isMutating } = trpc.bills.update.useMutation({
    onError: (e) => {
      utils.bills.invalidate();
      notifications.onError(e);
    },
    onSuccess: () => {
      utils.bills.invalidate();
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

import { trpc } from "src/utils/trpc";

import { notifyTemplate } from "../notifyTemplate";

const id = "useDeleteTransactions";
const notifications = notifyTemplate(id, "Transaction", "Delete");

export const useDeleteTransactions = ({
  ids,
  journalIds,
  maxDeleted,
  deleteComplete = false,
  onSuccess,
  onError,
  onMutate
}: {
  ids?: string[];
  journalIds?: string[];
  maxDeleted?: number;
  deleteComplete?: boolean;
  onSuccess?: () => void;
  onError?: () => void;
  onMutate?: () => void;
} = {}) => {
  const utils = trpc.useContext();
  const { mutate, isLoading: isMutating } =
    trpc.journals.deleteTransactions.useMutation({
      onError: (e) => {
        notifications.onError(e);
        onError && onError();
        utils.journals.invalidate();
      },

      onSuccess: () => {
        notifications.onSuccess();
        onSuccess && onSuccess();
        utils.journals.invalidate();
      },
      onMutate: () => {
        notifications.onLoading();
        onMutate && onMutate();
      }
    });

  const deleteTrans = () => {
    mutate({ ids, journalIds, maxDeleted, canDeleteComplete: deleteComplete });
  };

  return {
    isMutating,
    mutate,
    deleteTrans
  };
};

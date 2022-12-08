import { trpc } from "src/utils/trpc";
import { notifyTemplate } from "../notifyTemplate";

const id = "useCloneTransactions";
const notifications = notifyTemplate(id, "Transaction", "Clone");

export const useCloneTransactions = ({
  ids,
  maxUpdated,
  onSuccess,
  onError,
  onMutate,
}: {
  ids?: string[];
  maxUpdated?: number;
  onSuccess?: () => void;
  onError?: () => void;
  onMutate?: () => void;
} = {}) => {
  const utils = trpc.useContext();
  const { mutate, isLoading: isMutating } =
    trpc.journals.cloneTransactions.useMutation({
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
      },
    });

  const clone = () => {
    mutate({ ids, maxUpdated });
  };

  return {
    isMutating,
    mutate,
    clone,
  };
};

import { trpc } from "src/utils/trpc";

import { notifyTemplate } from "../notifyTemplate";

const id = "useUpdateJournal";
const notifications = notifyTemplate(id, "Journal", "Update");

export const useUpdateJournals = ({
  onSuccess,
  onError,
  onMutate
}: {
  onSuccess?: () => void;
  onError?: () => void;
  onMutate?: () => void;
} = {}) => {
  const utils = trpc.useContext();
  const { mutate, isLoading: isMutating } =
    trpc.journals.updateJournals.useMutation({
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

  return {
    isMutating,
    mutate
  };
};

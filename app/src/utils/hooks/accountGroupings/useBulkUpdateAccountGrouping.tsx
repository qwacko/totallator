import { trpc } from "src/utils/trpc";
import { notifyTemplate } from "../notifyTemplate";

const id = "useBulkUpdateAccountGrouping";
const notifications = notifyTemplate(id, "Account Grouping", "Bulk Update");

export function useBulkUpdateAccountGrouping({
  onMutate,
  setMutating,
}: {
  onMutate?: () => void;
  setMutating?: (state: boolean) => void;
}) {
  const utils = trpc.useContext();
  const mutate = trpc.accountGroupings.bulkUpdate.useMutation({
    onMutate: () => {
      notifications.onLoading();
      onMutate && onMutate();
      setMutating && setMutating(true);
    },
    onError: (e) => {
      setMutating && setMutating(false);
      utils.accountGroupings.invalidate();
      notifications.onError(e);
    },
    onSuccess: () => {
      utils.accountGroupings.invalidate();
      notifications.onSuccess();
      setMutating && setMutating(false);
    },
  });
  return { mutate };
}

import { trpc } from "src/utils/trpc";
import { notifyTemplate } from "../notifyTemplate";

const id = "useDeleteLinkedAccountGrouping";
const notifications = notifyTemplate(id, "Account Grouping", "Delete Linked");
const id2 = "useDeleteAccountGrouping";
const notifications2 = notifyTemplate(id, "Account Grouping", "Delete");

export const useDeleteAccountGrouping = ({
  accountGroupingId,
  onMutate,
}: {
  accountGroupingId: string;
  onMutate?: () => void;
}) => {
  const utils = trpc.useContext();

  const { mutate: clearLinkedMutation, isLoading: isClearLinkedMutating } =
    trpc.accountGroupings.clearLinkedItems.useMutation({
      onMutate: (data) => {
        notifications.onLoading();
        onMutate && onMutate();
      },
      onError: (e) => {
        utils.accountGroupings.invalidate();
        notifications.onError(e);
      },
      onSuccess: () => {
        utils.accountGroupings.invalidate();
        notifications.onSuccess();
      },
    });

  const { mutate: deleteMutation, isLoading: isDeleteMutating } =
    trpc.accountGroupings.delete.useMutation({
      onMutate: (data) => {
        notifications2.onLoading();
        onMutate && onMutate();
      },
      onError: (e) => {
        utils.accountGroupings.invalidate();
        notifications2.onError(e);
      },
      onSuccess: () => {
        utils.accountGroupings.invalidate();
        notifications2.onSuccess();
      },
    });

  const { data: canDelete, isLoading } = trpc.accountGroupings.canSeed.useQuery(
    {
      accountGroupingId,
    }
  );

  const clearLinked = () => {
    clearLinkedMutation({ accountGroupingId: accountGroupingId });
  };
  const deleteAG = () => {
    deleteMutation({ accountGroupingId: accountGroupingId });
  };

  return {
    canDelete,
    isLoading,
    isClearLinkedMutating,
    isDeleteMutating,
    clearLinked,
    deleteAG,
  };
};

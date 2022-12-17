import { trpc } from "src/utils/trpc";
import { notifyTemplate } from "../notifyTemplate";

const id = "useSeedAccountGrouping";
const notifications = notifyTemplate(id, "Account Grouping", "Seed");

export const useSeedAccountGrouping = ({
  accountGroupingId,
  onMutate,
}: {
  accountGroupingId: string;
  onMutate?: () => void;
}) => {
  const utils = trpc.useContext();

  const { mutate, isLoading: isMutating } =
    trpc.accountGroupings.seed.useMutation({
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

  const { data: canSeed, isLoading } = trpc.accountGroupings.canSeed.useQuery({
    accountGroupingId,
  });

  const seed = (count: number = 0) => {
    mutate({ accountGroupingId, transactionCount: count });
  };

  return { canSeed, isLoading, isMutating, seed };
};

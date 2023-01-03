import { useForm, zodResolver } from "@mantine/form";
import { useCallback } from "react";
import { trpc } from "src/utils/trpc";
import {
  type SeedAcconutGroupingInputValidationType,
  seedAccountGroupingInputValidation,
} from "src/utils/validation/accountGrouping/seedAccountGroupingValidation";
import { notifyTemplate } from "../notifyTemplate";

const id = "useSeedAccountGrouping";
const notifications = notifyTemplate(id, "Account Grouping", "Seed");

const initialValues = (
  accountGroupingId: string
): SeedAcconutGroupingInputValidationType => ({
  accountGroupingId,
  includeBusiness: false,
  includePersonal: true,
  seedAsSample: false,
  numberYears: 5,
  transactionCount: 0,
});

export const useSeedAccountGrouping = ({
  accountGroupingId,
  onMutate,
}: {
  accountGroupingId: string;
  onMutate?: () => void;
}) => {
  const utils = trpc.useContext();

  const form = useForm<SeedAcconutGroupingInputValidationType>({
    validate: zodResolver(seedAccountGroupingInputValidation),
    initialValues: initialValues(accountGroupingId),
  });

  const { mutate, isLoading: isMutating } =
    trpc.accountGroupings.seed.useMutation({
      onMutate: () => {
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

  const reset = useCallback(() => {
    const initial = initialValues(accountGroupingId);
    form.setValues(initial);
  }, [form, accountGroupingId]);

  return { canSeed, isLoading, isMutating, mutate, form, reset };
};

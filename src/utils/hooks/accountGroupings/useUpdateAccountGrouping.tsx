import { useForm, zodResolver } from "@mantine/form";

import { trpc } from "src/utils/trpc";
import {
  updateAccountGroupingDataValidation,
  type updateAccountGroupingDataValidationType
} from "src/utils/validation/accountGrouping/updateAccountGroupingValidation";

import { notifyTemplate } from "../notifyTemplate";

const id = "useUpdateAccountGrouping";
const notifications = notifyTemplate(id, "Account Grouping", "Update");

export function useUpdateAccountGrouping({
  onMutate,
  initialValues
}: {
  onMutate?: () => void;
  initialValues?: updateAccountGroupingDataValidationType;
}) {
  const form = useForm<updateAccountGroupingDataValidationType>({
    validate: zodResolver(updateAccountGroupingDataValidation),
    initialValues
  });
  const utils = trpc.useContext();
  const mutate = trpc.accountGroupings.update.useMutation({
    onMutate: (data) => {
      notifications.onLoading();
      onMutate && onMutate();
      const currentAG = utils.accountGroupings.get.getData();

      if (currentAG) {
        utils.accountGroupings.get.setData(
          currentAG.map((ag) => {
            if (ag.id === data.id) {
              return { ...ag, ...data.data };
            }
            return ag;
          })
        );
      }
    },
    onError: (e) => {
      utils.accountGroupings.invalidate();
      notifications.onError(e);
    },
    onSuccess: () => {
      utils.accountGroupings.invalidate();
      notifications.onSuccess();
    }
  });
  return { form, mutate };
}

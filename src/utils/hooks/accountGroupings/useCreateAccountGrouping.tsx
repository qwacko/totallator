import { useForm, zodResolver } from "@mantine/form";

import { trpc } from "src/utils/trpc";
import {
  createAccountGroupingValidation,
  type createAccountGroupingValidationType
} from "src/utils/validation/accountGrouping/createAccountGroupingValidation";

import { notifyTemplate } from "../notifyTemplate";

const id = "useCreateAccountGrouping";
const notifications = notifyTemplate(id, "Account Grouping", "Create");

export function useCreateAccountGrouping({
  onMutate
}: {
  onMutate?: () => void;
}) {
  const form = useForm<createAccountGroupingValidationType>({
    validate: zodResolver(createAccountGroupingValidation)
  });
  const utils = trpc.useContext();
  const mutate = trpc.accountGroupings.create.useMutation({
    onMutate: (data) => {
      notifications.onLoading();
      onMutate && onMutate();
      const currentAG = utils.accountGroupings.get.getData();

      if (currentAG) {
        utils.accountGroupings.get.setData(undefined, [
          ...currentAG,
          {
            id: "New",
            title: data.title,
            userIsAdmin: false,
            status: "Active",
            users: [],
            active: true,
            allowUpdate: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            deleted: false,
            disabled: false
          }
        ]);
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

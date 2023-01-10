import { useForm, zodResolver } from "@mantine/form";
import type { AccountsReturnType } from "src/server/trpc/router/_app";
import { trpc } from "src/utils/trpc";
import {
  updateAccountDataValidation,
  type updateAccountDataValidationType,
} from "src/utils/validation/account/updateAccountValidation";
import { notifyTemplate } from "../notifyTemplate";
import { useFormHandler } from "../useFormHandler";

const id = "useUpdateAccount";
const notifications = notifyTemplate(id, "Account", "Update");

type keysType = keyof updateAccountDataValidationType &
  keyof AccountsReturnType;

export const useUpdateAccount = ({
  id,
  keys,
  data,
}: {
  id: string;
  keys: keysType[];
  data: AccountsReturnType;
}) => {
  const form = useForm<updateAccountDataValidationType>({
    validate: zodResolver(updateAccountDataValidation),
  });

  const utils = trpc.useContext();
  const { mutate, isLoading: isMutating } = trpc.accounts.update.useMutation({
    onError: (e) => {
      utils.accounts.invalidate();
      notifications.onError(e);
      resetForm();
    },
    onSuccess: () => {
      utils.accounts.invalidate();
      notifications.onSuccess();
    },
    onMutate: (data) => {
      notifications.onLoading();
      const currentAccounts = utils.accounts.get.getData();
      if (currentAccounts) {
        utils.accounts.get.setData(
          currentAccounts.map((account) => {
            if (account.id === id) {
              return { ...account, ...data };
            }
            return account;
          })
        );
      }
    },
  });

  const { resetForm, runMutate } = useFormHandler({
    data,
    form,
    keys,
    id,
    mutate,
    formDataToMutateData: (id, data) => ({ id, data }),
  });

  return {
    isMutating,
    mutate,
    form,
    runMutate,
    resetForm,
  };
};

import { useForm, zodResolver } from "@mantine/form";
import { useEffect } from "react";
import { type AppRouterOutputs } from "src/server/trpc/router/_app";
import { trpc } from "src/utils/trpc";
import {
  updateAccountDataValidation,
  type updateAccountDataValidationType,
} from "src/utils/validation/account/updateAccountValidation";
import { notifyTemplate } from "../notifyTemplate";

const id = "useUpdateAccount";
const notifications = notifyTemplate(id, "Account", "Update");

type keysType = keyof updateAccountDataValidationType;

export const useUpdateAccount = ({
  id,
  keys,
  data,
}: {
  id: string;
  keys: keysType[];
  data: AppRouterOutputs["accounts"]["get"][0];
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

  const pickItems = (
    pickData:
      | AppRouterOutputs["accounts"]["get"][0]
      | updateAccountDataValidationType
  ) => {
    return keys.reduce(
      (prev, current) => ({ ...prev, [current]: pickData[current] }),
      {}
    );
  };

  const resetForm = () => {
    if (data) {
      form.setValues(pickItems(data));
    }
  };

  useEffect(() => {
    resetForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const runMutate = () => {
    const hasChanged =
      JSON.stringify(pickItems(data)) !==
      JSON.stringify(pickItems(form.values));
    if (hasChanged) {
      const validated = form.validate();
      if (!validated.hasErrors) {
        mutate({ id, data: form.values });
      } else {
        resetForm();
      }
    }
  };

  return {
    isMutating,
    mutate,
    form,
    runMutate,
    resetForm,
  };
};

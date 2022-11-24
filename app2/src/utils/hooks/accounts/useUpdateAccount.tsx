import { useForm, zodResolver } from "@mantine/form";
import { useEffect } from "react";
import { AppRouter, AppRouterOutputs } from "src/server/trpc/router/_app";
import { trpc } from "src/utils/trpc";
import {
  updateAccountDataValidation,
  type updateAccountDataValidationType,
} from "src/utils/validation/account/updateAccountValidation";
import { notifyTemplate } from "../notifyTemplate";

const id = "useUpdateAccount";
const notifications = notifyTemplate(id, "Account", "Update");

type keysType = keyof updateAccountDataValidationType;

const query = undefined;

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
      console.log("On Error");
      utils.accounts.invalidate();
      notifications.onError(e);
      resetForm();
    },
    onSuccess: () => {
      console.log("On Success");
      utils.accounts.invalidate();
      notifications.onSuccess();
    },
    onMutate: (data) => {
      console.log("On Mutate");
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

  const pickItems = (pickData: AppRouterOutputs["accounts"]["get"][0]) => {
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
  }, [data]);

  const runMutate = () => {
    console.log("Running Mutation");
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

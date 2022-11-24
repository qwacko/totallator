import { useForm, zodResolver } from "@mantine/form";
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

export const useUpdateAccount = ({
  id,
  keys,
}: {
  id: string;
  keys: keysType[];
}) => {
  const form = useForm<updateAccountDataValidationType>({
    validate: zodResolver(updateAccountDataValidation),
  });

  const utils = trpc.useContext();
  const pickItems = (pickData: AppRouterOutputs["accounts"]["get"][0]) => {
    return keys.reduce(
      (prev, current) => ({ ...prev, [current]: pickData[current] }),
      {}
    );
  };

  const { data, isLoading } = trpc.accounts.get.useQuery(undefined, {
    select: (data) => data.find((item) => item.id === id),
    onSuccess: (newData) => {
      if (newData) {
        form.setValues(pickItems(newData));
      }
    },
  });

  const resetForm = () => {
    if (data) {
      form.setValues(pickItems(data));
    }
  };

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

  const runMutate = () => {
    const hasChanged = false;
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
    account: data,
    isLoading,
    isMutating,
    mutate,
    form,
    runMutate,
    resetForm,
  };
};

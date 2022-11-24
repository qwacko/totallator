import { useForm, zodResolver } from "@mantine/form";
import { trpc } from "src/utils/trpc";
import {
  updateAccountDataValidation,
  updateAccountDataValidationType,
} from "src/utils/validation/account/updateAccountValidation";
import { notifyTemplate } from "../notifyTemplate";

const id = "useUpdateAccount";
const notifications = notifyTemplate(id, "Account", "Update");

export const useUpdateAccount = ({ id }: { id: string }) => {
  const form = useForm<updateAccountDataValidationType>({
    validate: zodResolver(updateAccountDataValidation),
  });

  const utils = trpc.useContext();

  const { data, isLoading } = trpc.accounts.get.useQuery(undefined, {
    select: (data) => data.find((item) => item.id === id),
    onSuccess: (data) => {
      if (data) {
        form.setValues({
          title: data.title,
          status: data.status,
          isCash: data.isCash,
          isNetWorth: data.isNetWorth,
          accountGroup: data.accountGroup || undefined,
          accountGroup2: data.accountGroup2 || undefined,
          accountGroup3: data.accountGroup3 || undefined,
          type: data.type,
        });
      }
    },
  });

  const resetForm = () => {
    if (data) {
      form.setValues({
        title: data.title,
        status: data.status,
        isCash: data.isCash,
        isNetWorth: data.isNetWorth,
        accountGroup: data.accountGroup || undefined,
        accountGroup2: data.accountGroup2 || undefined,
        accountGroup3: data.accountGroup3 || undefined,
        type: data.type,
      });
    }
  };

  const hasChanged = !(
    form.values.status === data?.status &&
    form.values.title === data?.title &&
    form.values.isCash === data?.isCash &&
    form.values.isNetWorth === data?.isNetWorth &&
    form.values.accountGroup === (data?.accountGroup || undefined) &&
    form.values.accountGroup2 === (data?.accountGroup2 || undefined) &&
    form.values.accountGroup3 === (data?.accountGroup3 || undefined) &&
    form.values.type === data?.type
  );

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
    hasChanged,
    runMutate,
    resetForm,
  };
};

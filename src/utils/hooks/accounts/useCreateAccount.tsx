import { useForm, zodResolver } from "@mantine/form";
import type { TransactionAccount } from "@prisma/client";

import { trpc } from "src/utils/trpc";
import {
  createAccountValidation,
  type createAccountValidationType
} from "src/utils/validation/account/createAccountValidation";

import { notifyTemplate } from "../notifyTemplate";

const id = "useCreateAccount";
const notifications = notifyTemplate(id, "Account", "Create");

export function useCreateAccount({
  onMutate,
  onSuccess
}: {
  onMutate?: () => void;
  onSuccess?: (data: TransactionAccount) => void;
}) {
  const form = useForm<createAccountValidationType>({
    validate: zodResolver(createAccountValidation)
  });
  const utils = trpc.useContext();
  const mutate = trpc.accounts.create.useMutation({
    onMutate: () => {
      notifications.onLoading();
      onMutate && onMutate();
    },
    onError: (e) => {
      utils.accounts.invalidate();
      notifications.onError(e);
    },
    onSuccess: (newAccount) => {
      form.reset();
      utils.accounts.invalidate();
      notifications.onSuccess();
      onSuccess && onSuccess(newAccount);
    }
  });
  return { form, mutate };
}

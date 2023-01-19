import { useForm, zodResolver } from "@mantine/form";

import { trpc } from "src/utils/trpc";
import {
  createSimpleTransactionValidation,
  type createSimpleTransactionValidationType
} from "src/utils/validation/journalEntries/createJournalValidation";

import { notifyTemplate } from "../notifyTemplate";

const id = "useCreateTransactionSimple";
const notifications = notifyTemplate(id, "Transaction", "Create");

export function useCreateTransactionSimple({
  onMutate
}: {
  onMutate?: () => void;
}) {
  const form = useForm<createSimpleTransactionValidationType>({
    validate: zodResolver(createSimpleTransactionValidation)
  });

  const utils = trpc.useContext();
  const mutate = trpc.journals.createSimpleTransaction.useMutation({
    onMutate: () => {
      notifications.onLoading();
      onMutate && onMutate();
    },
    onError: (e) => {
      utils.journals.invalidate();
      notifications.onError(e);
    },
    onSuccess: () => {
      form.reset();
      utils.journals.invalidate();
      notifications.onSuccess();
    }
  });
  return { form, mutate };
}

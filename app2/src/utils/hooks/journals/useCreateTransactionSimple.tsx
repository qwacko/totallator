import { trpc } from "src/utils/trpc";
import { useForm, zodResolver } from "@mantine/form";
import { notifyTemplate } from "../notifyTemplate";
import {
  createSimpleTransactionValidation,
  type createSimpleTransactionValidationType,
} from "src/utils/validation/journalEntries/createJournalValidation";
import { useEffect } from "react";

const id = "useCreateTransactionSimple";
const notifications = notifyTemplate(id, "Transaction", "Create");

export function useCreateTransactionSimple({
  onMutate,
}: {
  onMutate?: () => void;
}) {
  const form = useForm<createSimpleTransactionValidationType>({
    validate: zodResolver(createSimpleTransactionValidation),
  });

  //Initialise the date. Better than using the form initial
  //values as that expects every value to be set
  useEffect(() => {
    form.setFieldValue("date", new Date());
  }, [form, form.setFieldValue]);
  const utils = trpc.useContext();
  const mutate = trpc.journals.createSimpleTransaction.useMutation({
    onMutate: () => {
      notifications.onLoading();
      onMutate && onMutate();
    },
    onError: (e) => {
      utils.bills.invalidate();
      notifications.onError(e);
    },
    onSuccess: () => {
      form.reset();
      utils.bills.invalidate();
      notifications.onSuccess();
    },
  });
  return { form, mutate };
}

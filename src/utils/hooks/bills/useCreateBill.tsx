import { useForm, zodResolver } from "@mantine/form";

import { trpc } from "src/utils/trpc";
import {
  createBillValidation,
  type createBillValidationType
} from "src/utils/validation/bill/createBillValidation";

import { notifyTemplate } from "../notifyTemplate";

const id = "useCreateBill";
const notifications = notifyTemplate(id, "Bill", "Create");

export function useCreateBill({ onMutate }: { onMutate?: () => void }) {
  const form = useForm<createBillValidationType>({
    validate: zodResolver(createBillValidation)
  });
  const utils = trpc.useContext();
  const mutate = trpc.bills.create.useMutation({
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
    }
  });
  return { form, mutate };
}

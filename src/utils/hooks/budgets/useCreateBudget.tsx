import { useForm, zodResolver } from "@mantine/form";

import { trpc } from "src/utils/trpc";
import {
  createBudgetValidation,
  type createBudgetValidationType
} from "src/utils/validation/budget/createBudgetValidation";

import { notifyTemplate } from "../notifyTemplate";

const id = "useCreateBudget";
const notifications = notifyTemplate(id, "Budget", "Create");

export function useCreateBudget({ onMutate }: { onMutate?: () => void }) {
  const form = useForm<createBudgetValidationType>({
    validate: zodResolver(createBudgetValidation)
  });
  const utils = trpc.useContext();
  const mutate = trpc.budgets.create.useMutation({
    onMutate: () => {
      notifications.onLoading();
      onMutate && onMutate();
    },
    onError: (e) => {
      utils.budgets.invalidate();
      notifications.onError(e);
    },
    onSuccess: () => {
      form.reset();
      utils.budgets.invalidate();
      notifications.onSuccess();
    }
  });
  return { form, mutate };
}

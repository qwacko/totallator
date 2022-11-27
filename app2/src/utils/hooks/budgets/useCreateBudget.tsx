import { trpc } from "src/utils/trpc";
import { useForm, zodResolver } from "@mantine/form";
import { notifyTemplate } from "../notifyTemplate";
import {
  createBudgetValidation,
  type createBudgetValidationType,
} from "src/utils/validation/budget/createBudgetValidation";

const id = "useCreateBudget";
const notifications = notifyTemplate(id, "Budget", "Create");

export function useCreateBudget({ onMutate }: { onMutate?: () => void }) {
  const form = useForm<createBudgetValidationType>({
    validate: zodResolver(createBudgetValidation),
  });
  const utils = trpc.useContext();
  const mutate = trpc.budgets.create.useMutation({
    onMutate: (data) => {
      notifications.onLoading();
      onMutate && onMutate();
      const currentBudgets = utils.budgets.get.getData();

      if (currentBudgets) {
        utils.budgets.get.setData([
          ...currentBudgets,
          {
            accountGroupingId: data.accountGroupingId,
            id: "New",
            title: data.title,
            userIsAdmin: false,
            status: "Active",
            active: true,
            allowUpdate: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            deleted: false,
            disabled: false,
            _count: { journalEntries: 0 },
          },
        ]);
      }
    },
    onError: (e) => {
      utils.budgets.invalidate();
      notifications.onError(e);
    },
    onSuccess: () => {
      form.reset();
      utils.budgets.invalidate();
      notifications.onSuccess();
    },
  });
  return { form, mutate };
}

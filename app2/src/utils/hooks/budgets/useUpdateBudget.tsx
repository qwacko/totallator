import { useForm, zodResolver } from "@mantine/form";
import { trpc } from "src/utils/trpc";
import {
  updateBudgetDataValidation,
  type updateBudgetDataValidationType,
} from "src/utils/validation/budget/updateBudgetValidation";
import { notifyTemplate } from "../notifyTemplate";

const id = "useCreateBudget";
const notifications = notifyTemplate(id, "Budget", "Update");

export const useUpdateBudget = ({ id }: { id: string }) => {
  const form = useForm<updateBudgetDataValidationType>({
    validate: zodResolver(updateBudgetDataValidation),
  });

  const utils = trpc.useContext();

  const { data, isLoading } = trpc.budgets.get.useQuery(undefined, {
    select: (data) => data.find((item) => item.id === id),
    onSuccess: (data) => {
      if (data) {
        form.setValues({ title: data.title, status: data.status });
      }
    },
  });

  const resetForm = () => {
    if (data) {
      form.setValues({ title: data.title, status: data.status });
    }
  };

  const hasChanged = !(
    form.values.status === data?.status && form.values.title === data?.title
  );

  const { mutate, isLoading: isMutating } = trpc.budgets.update.useMutation({
    onError: (e) => {
      utils.budgets.invalidate();
      notifications.onError(e);
      resetForm();
    },
    onSuccess: () => {
      utils.budgets.invalidate();
      notifications.onSuccess();
    },
    onMutate: (data) => {
      notifications.onLoading();
      const currentBudgets = utils.budgets.get.getData();
      if (currentBudgets) {
        utils.budgets.get.setData(
          currentBudgets.map((budget) => {
            if (budget.id === id) {
              return { ...budget, ...data };
            }
            return budget;
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
    budget: data,
    isLoading,
    isMutating,
    mutate,
    form,
    hasChanged,
    runMutate,
    resetForm,
  };
};

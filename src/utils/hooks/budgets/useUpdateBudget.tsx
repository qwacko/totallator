import { useForm, zodResolver } from "@mantine/form";

import type { BudgetsReturnType } from "src/server/trpc/router/_app";
import { trpc } from "src/utils/trpc";
import {
  updateBudgetDataValidation,
  type updateBudgetDataValidationType
} from "src/utils/validation/budget/updateBudgetValidation";

import { notifyTemplate } from "../notifyTemplate";
import { useFormHandler } from "../useFormHandler";

const id = "useCreateBudget";
const notifications = notifyTemplate(id, "Budget", "Update");

type keysType = keyof updateBudgetDataValidationType;

export const useUpdateBudget = ({
  id,
  keys,
  data
}: {
  id: string;
  keys: keysType[];
  data: BudgetsReturnType;
}) => {
  const form = useForm<updateBudgetDataValidationType>({
    validate: zodResolver(updateBudgetDataValidation)
  });

  const utils = trpc.useContext();
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
    }
  });

  const { resetForm, runMutate } = useFormHandler({
    data,
    form,
    keys,
    id,
    mutate,
    formDataToMutateData: (id, data) => ({ id, data })
  });

  return {
    budget: data,
    isMutating,
    mutate,
    form,
    runMutate,
    resetForm
  };
};

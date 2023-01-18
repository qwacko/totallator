import { useForm, zodResolver } from "@mantine/form";

import type { CategoriesReturnType } from "src/server/trpc/router/_app";
import { trpc } from "src/utils/trpc";
import {
  updateCategoryDataValidation,
  type updateCategoryDataValidationType
} from "src/utils/validation/category/updateCategoryValidation";

import { notifyTemplate } from "../notifyTemplate";
import { useFormHandler } from "../useFormHandler";

const id = "useUpdateCategory";
const notifications = notifyTemplate(id, "Category", "Update");

type keysType = keyof updateCategoryDataValidationType;

export const useUpdateCategory = ({
  id,
  keys,
  data
}: {
  id: string;
  keys: keysType[];
  data: CategoriesReturnType;
}) => {
  const form = useForm<updateCategoryDataValidationType>({
    validate: zodResolver(updateCategoryDataValidation)
  });

  const utils = trpc.useContext();
  const { mutate, isLoading: isMutating } = trpc.categories.update.useMutation({
    onError: (e) => {
      utils.categories.invalidate();
      notifications.onError(e);
      resetForm();
    },
    onSuccess: () => {
      utils.categories.invalidate();
      notifications.onSuccess();
    },
    onMutate: (data) => {
      notifications.onLoading();
      const currentCategories = utils.categories.get.getData();
      if (currentCategories) {
        utils.categories.get.setData(
          undefined,
          currentCategories.map((category) => {
            if (category.id === id) {
              return { ...category, ...data };
            }
            return category;
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
    category: data,
    isMutating,
    mutate,
    form,
    runMutate,
    resetForm
  };
};

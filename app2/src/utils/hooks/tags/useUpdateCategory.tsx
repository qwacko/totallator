import { useForm, zodResolver } from "@mantine/form";
import { trpc } from "src/utils/trpc";
import {
  updateCategoryDataValidation,
  type updateCategoryDataValidationType,
} from "src/utils/validation/category/updateCategoryValidation";
import { notifyTemplate } from "../notifyTemplate";

const id = "useUpdateCategory";
const notifications = notifyTemplate(id, "Category", "Update");

export const useUpdateCategory = ({ id }: { id: string }) => {
  const form = useForm<updateCategoryDataValidationType>({
    validate: zodResolver(updateCategoryDataValidation),
  });

  const utils = trpc.useContext();

  const { data, isLoading } = trpc.categories.get.useQuery(undefined, {
    select: (data) => data.find((item) => item.id === id),
    onSuccess: (data) => {
      if (data) {
        form.setValues({
          title: data.title,
          group: data.group,
          single: data.single,
          status: data.status,
        });
      }
    },
  });

  const resetForm = () => {
    if (data) {
      form.setValues({
        group: data.group,
        single: data.single,
        status: data.status,
        title: data.title,
      });
    }
  };

  const hasChanged = !(
    form.values.status === data?.status &&
    form.values.group === data?.group &&
    form.values.single === data?.single &&
    form.values.title === data?.title
  );

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
          currentCategories.map((category) => {
            if (category.id === id) {
              return { ...category, ...data };
            }
            return category;
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
    category: data,
    isLoading,
    isMutating,
    mutate,
    form,
    hasChanged,
    runMutate,
    resetForm,
  };
};

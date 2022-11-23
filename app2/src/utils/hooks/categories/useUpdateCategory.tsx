import { useForm, zodResolver } from "@mantine/form";
import { trpc } from "src/utils/trpc";
import {
  updateCategoryDataValidation,
  type updateCategoryDataValidationType,
} from "src/utils/validation/category/updateCategoryValidation";
import { notifyTemplate } from "../notifyTemplate";

const id = "useUpdateCategory";
const notifications = notifyTemplate(id, "Catgory", "Update");

export const useUpdateCategory = ({ id }: { id: string }) => {
  const formGroupSingle = useForm<updateCategoryDataValidationType>({
    validate: zodResolver(updateCategoryDataValidation),
  });

  const formTitle = useForm<updateCategoryDataValidationType>({
    validate: zodResolver(updateCategoryDataValidation),
  });

  const utils = trpc.useContext();

  const { data, isLoading } = trpc.categories.get.useQuery(undefined, {
    select: (data) => data.find((item) => item.id === id),
    onSuccess: (data) => {
      if (data) {
        formTitle.setValues({
          title: data.title,
          status: data.status,
        });

        formGroupSingle.setValues({
          group: data.group,
          single: data.single,
          status: data.status,
        });
      }
    },
  });

  const resetForm = () => {
    if (data) {
      formGroupSingle.setValues({
        group: data.group,
        single: data.single,
        status: data.status,
      });
      formTitle.setValues({
        status: data.status,
        title: data.title,
      });
    }
  };

  const groupSingleHasChanged = !(
    formGroupSingle.values.status === data?.status &&
    formGroupSingle.values.group === data?.group &&
    formGroupSingle.values.single === data?.single
  );

  const titleHasChanged = !(
    formTitle.values.status === data?.status &&
    formTitle.values.title === data?.title
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

  const runMutateTitle = () => {
    if (titleHasChanged) {
      const validated = formTitle.validate();
      if (!validated.hasErrors) {
        mutate({ id, data: formTitle.values });
      } else {
        resetForm();
      }
    }
  };

  const runMutateGroupSingle = () => {
    if (groupSingleHasChanged) {
      const validated = formGroupSingle.validate();
      if (!validated.hasErrors) {
        mutate({ id, data: formGroupSingle.values });
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
    formTitle,
    formGroupSingle,
    titleHasChanged,
    groupSingleHasChanged,
    runMutateTitle,
    runMutateGroupSingle,
    resetForm,
  };
};

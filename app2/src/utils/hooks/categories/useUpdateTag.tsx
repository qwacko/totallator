import { useForm, zodResolver } from "@mantine/form";
import { trpc } from "src/utils/trpc";
import {
  updateTagDataValidation,
  type updateTagDataValidationType,
} from "src/utils/validation/tag/updateTagValidation";
import { notifyTemplate } from "../notifyTemplate";

const id = "useUpdateTag";
const notifications = notifyTemplate(id, "Tag", "Update");

export const useUpdateTag = ({ id }: { id: string }) => {
  const form = useForm<updateTagDataValidationType>({
    validate: zodResolver(updateTagDataValidation),
  });

  const utils = trpc.useContext();

  const { data, isLoading } = trpc.tags.get.useQuery(undefined, {
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

  const { mutate, isLoading: isMutating } = trpc.tags.update.useMutation({
    onError: (e) => {
      utils.tags.invalidate();
      notifications.onError(e);
      resetForm();
    },
    onSuccess: () => {
      utils.tags.invalidate();
      notifications.onSuccess();
    },
    onMutate: (data) => {
      notifications.onLoading();
      const currentTags = utils.tags.get.getData();
      if (currentTags) {
        utils.tags.get.setData(
          currentTags.map((tag) => {
            if (tag.id === id) {
              return { ...tag, ...data };
            }
            return tag;
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
    tag: data,
    isLoading,
    isMutating,
    mutate,
    form,
    hasChanged,
    runMutate,
    resetForm,
  };
};

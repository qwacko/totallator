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
  const formGroupSingle = useForm<updateTagDataValidationType>({
    validate: zodResolver(updateTagDataValidation),
  });

  const formTitle = useForm<updateTagDataValidationType>({
    validate: zodResolver(updateTagDataValidation),
  });

  const utils = trpc.useContext();

  const { data, isLoading } = trpc.tags.get.useQuery(undefined, {
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
    tag: data,
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

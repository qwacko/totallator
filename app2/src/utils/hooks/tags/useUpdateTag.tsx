import { useForm, zodResolver } from "@mantine/form";
import type { TagsReturnType } from "src/server/trpc/router/_app";
import { trpc } from "src/utils/trpc";
import {
  updateTagDataValidation,
  type updateTagDataValidationType,
} from "src/utils/validation/tag/updateTagValidation";
import { notifyTemplate } from "../notifyTemplate";
import { useFormHandler } from "../useFormHandler";

const id = "useUpdateTag";
const notifications = notifyTemplate(id, "Tag", "Update");

type keysType = keyof updateTagDataValidationType;

export const useUpdateTag = ({
  id,
  keys,
  data,
}: {
  id: string;
  keys: keysType[];
  data: TagsReturnType;
}) => {
  const form = useForm<updateTagDataValidationType>({
    validate: zodResolver(updateTagDataValidation),
  });

  const utils = trpc.useContext();
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
  const { resetForm, runMutate } = useFormHandler({
    data,
    form,
    keys,
    id,
    mutate,
  });

  return {
    tag: data,
    isMutating,
    mutate,
    form,
    runMutate,
    resetForm,
  };
};

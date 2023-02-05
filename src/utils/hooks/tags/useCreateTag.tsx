import { useForm, zodResolver } from "@mantine/form";

import { trpc } from "src/utils/trpc";
import {
  createTagValidation,
  type createTagValidationType
} from "src/utils/validation/tag/createTagValidation";

import { notifyTemplate } from "../notifyTemplate";

const id = "useCreateTag";
const notifications = notifyTemplate(id, "TAg", "Create");

export function useCreateTag({ onMutate }: { onMutate?: () => void }) {
  const form = useForm<createTagValidationType>({
    validate: zodResolver(createTagValidation)
  });
  const utils = trpc.useContext();
  const mutate = trpc.tags.create.useMutation({
    onMutate: () => {
      notifications.onLoading();
      onMutate && onMutate();
    },
    onError: (e) => {
      utils.tags.invalidate();
      notifications.onError(e);
    },
    onSuccess: () => {
      form.reset();
      utils.tags.invalidate();
      notifications.onSuccess();
    }
  });
  return { form, mutate };
}

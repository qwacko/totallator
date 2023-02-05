import { useForm, zodResolver } from "@mantine/form";

import { trpc } from "src/utils/trpc";
import {
  createCategoryValidation,
  type createCategoryValidationType
} from "src/utils/validation/category/createCategoryValidation";

import { notifyTemplate } from "../notifyTemplate";

const id = "useCreateCategory";
const notifications = notifyTemplate(id, "Category", "Create");

export function useCreateCategory({ onMutate }: { onMutate?: () => void }) {
  const form = useForm<createCategoryValidationType>({
    validate: zodResolver(createCategoryValidation)
  });
  const utils = trpc.useContext();
  const mutate = trpc.categories.create.useMutation({
    onMutate: () => {
      notifications.onLoading();
      onMutate && onMutate();
    },
    onError: (e) => {
      utils.categories.invalidate();
      notifications.onError(e);
    },
    onSuccess: () => {
      form.reset();
      utils.categories.invalidate();
      notifications.onSuccess();
    }
  });
  return { form, mutate };
}

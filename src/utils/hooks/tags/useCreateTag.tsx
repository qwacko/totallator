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
    onMutate: (data) => {
      notifications.onLoading();
      onMutate && onMutate();
      const currentTags = utils.tags.get.getData();

      if (currentTags) {
        utils.tags.get.setData([
          ...currentTags,
          {
            accountGroupingId: data.accountGroupingId,
            id: "New",
            title: `${data.group}/${data.single}`,
            group: data.group,
            single: data.single,
            userIsAdmin: false,
            status: "Active",
            active: true,
            allowUpdate: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            deleted: false,
            disabled: false,
            _count: { journalEntries: 0 }
          }
        ]);
      }
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

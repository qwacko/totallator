import { trpc } from "src/utils/trpc";
import { useForm, zodResolver } from "@mantine/form";
import { notifyTemplate } from "../notifyTemplate";
import {
  createCategoryValidation,
  type createCategoryValidationType,
} from "src/utils/validation/category/createCategoryValidation";

const id = "useCreateCategory";
const notifications = notifyTemplate(id, "Category", "Create");

export function useCreateCategory({ onMutate }: { onMutate?: () => void }) {
  const form = useForm<createCategoryValidationType>({
    validate: zodResolver(createCategoryValidation),
  });
  const utils = trpc.useContext();
  const mutate = trpc.categories.create.useMutation({
    onMutate: (data) => {
      notifications.onLoading();
      onMutate && onMutate();
      const currentCategories = utils.categories.get.getData();

      if (currentCategories) {
        utils.categories.get.setData([
          ...currentCategories,
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
            _count: { journalEntries: 0 },
          },
        ]);
      }
    },
    onError: (e) => {
      utils.categories.invalidate();
      notifications.onError(e);
    },
    onSuccess: () => {
      form.reset();
      utils.categories.invalidate();
      notifications.onSuccess();
    },
  });
  return { form, mutate };
}

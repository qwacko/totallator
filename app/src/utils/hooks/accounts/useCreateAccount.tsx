import { trpc } from "src/utils/trpc";
import { useForm, zodResolver } from "@mantine/form";
import { notifyTemplate } from "../notifyTemplate";
import {
  createAccountValidation,
  type createAccountValidationType,
} from "src/utils/validation/account/createAccountValidation";

const id = "useCreateAccount";
const notifications = notifyTemplate(id, "Account", "Create");

export function useCreateAccount({ onMutate }: { onMutate?: () => void }) {
  const form = useForm<createAccountValidationType>({
    validate: zodResolver(createAccountValidation),
  });
  const utils = trpc.useContext();
  const mutate = trpc.accounts.create.useMutation({
    onMutate: (data) => {
      notifications.onLoading();
      onMutate && onMutate();
      const currentAccounts = utils.accounts.get.getData();

      if (currentAccounts) {
        utils.accounts.get.setData([
          ...currentAccounts,
          {
            accountGroupingId: data.accountGroupingId,
            id: "New",
            title: data.title,
            userIsAdmin: false,
            status: "Active",
            active: true,
            allowUpdate: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            deleted: false,
            disabled: false,
            accountGroup: data.accountGroup || null,
            accountGroup2: data.accountGroup2 || null,
            accountGroup3: data.accountGroup3 || null,
            accountGroupCombined: `${data.accountGroup}/${data.accountGroup2}/${data.accountGroup3}`,
            accountTitleCombined: `${data.accountGroup}/${data.accountGroup2}/${data.accountGroup3}/${data.title}`,
            isCash: data.isCash || false,
            isNetWorth: data.isNetWorth || false,
            type: data.type || "Expense",
            startDate: null,
            endDate: null,
            _count: { journalEntries: 0 },
          },
        ]);
      }
    },
    onError: (e) => {
      utils.accounts.invalidate();
      notifications.onError(e);
    },
    onSuccess: () => {
      form.reset();
      utils.accounts.invalidate();
      notifications.onSuccess();
    },
  });
  return { form, mutate };
}

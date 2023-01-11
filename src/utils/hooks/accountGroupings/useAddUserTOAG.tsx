import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";

import { trpc } from "src/utils/trpc";

import { notifyTemplate } from "../notifyTemplate";

const id = "useAddUserToAG";
const notifications = notifyTemplate(id, "Account Grouping", "User Add");

export const useAddUserToAG = ({ onSuccess }: { onSuccess: () => void }) => {
  const form = useForm<{ username: string }>({
    validate: zodResolver(z.object({ username: z.string() }))
  });

  const { mutate, isLoading } = trpc.accountGroupings.addUser.useMutation({
    onSuccess: () => {
      notifications.onSuccess();
      onSuccess();
    },
    onError: notifications.onError,
    onMutate: notifications.onLoading
  });

  return { form, mutate, isLoading };
};

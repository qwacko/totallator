import { useForm, zodResolver } from "@mantine/form";
import { useRouter } from "next/router";

import { trpc } from "src/utils/trpc";
import {
  type CreateUserValidationType,
  createUserValidation
} from "src/utils/validation/user/createUserValidation";

import { notifyTemplate } from "../notifyTemplate";

const id = "useCreateUser";
const notifications = notifyTemplate(id, "User", "Create");

export function useCreateUser() {
  const form = useForm<CreateUserValidationType>({
    validate: zodResolver(createUserValidation)
  });
  const router = useRouter();
  const createUser = trpc.user.createUser.useMutation({
    onMutate: notifications.onLoading,
    onError: notifications.onError,
    onSuccess: () => {
      notifications.onSuccess();
      router.push("/user/signin");
    }
  });
  return { form, createUser };
}

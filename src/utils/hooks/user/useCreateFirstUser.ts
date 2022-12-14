import { useForm, zodResolver } from "@mantine/form";
import { useRouter } from "next/router";

import { trpc } from "src/utils/trpc";
import {
  type CreateUserValidationType,
  createUserValidation
} from "src/utils/validation/user/createUserValidation";

import { notifyTemplate } from "../notifyTemplate";

const id = "useCreateFirstUser";
const notifications = notifyTemplate(id, "First User", "Create");

export function useCreateFirstUser() {
  const form = useForm<CreateUserValidationType>({
    validate: zodResolver(createUserValidation)
  });
  const router = useRouter();
  const firstUserExists = trpc.user.firstUserExists.useQuery();
  const createUser = trpc.user.createFirstUser.useMutation({
    onError: notifications.onError,
    onMutate: notifications.onLoading,
    onSuccess: () => {
      notifications.onSuccess();
      router.push("/user/signin");
    }
  });
  return { firstUserExists, router, form, createUser };
}

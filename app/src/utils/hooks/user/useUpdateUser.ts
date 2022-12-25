import { trpc } from "src/utils/trpc";
import { notifyTemplate } from "../notifyTemplate";

const id = "useUpdateUser";
const notifications = notifyTemplate(id, "User Settings", "Update");

export const useUpdateUser = ({
  onComplete,
}: { onComplete?: () => void } = {}) => {
  const utils = trpc.useContext();
  const { mutate: updateUser, isLoading } = trpc.user.updateUser.useMutation({
    onMutate: (data) => {
      notifications.onLoading();
      const currentData = utils.user.get.getData();
      if (currentData) {
        const updatedData = { ...currentData, ...data };
        utils.user.get.setData(updatedData);
      }
    },
    onError: (err) => {
      notifications.onError(err);
      utils.user.invalidate();
    },
    onSuccess: () => {
      notifications.onSuccess();
      utils.user.invalidate();
      onComplete && onComplete();
    },
  });

  return { updateUser, isUpdatingUser: isLoading };
};

import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";

export const notifyTemplate = (id: string, title: string, action: string) => {
  const onLoading = () => {
    notifications.show({
      id: `${id}Loading`,
      loading: true,
      title: `Updating ${title}`,
      message: "",
      color: "blue",
      autoClose: false,
      withCloseButton: false
    });
  };
  const clearLoading = () => {
    notifications.hide(`${id}Loading`);
  };

  const onSuccess = () => {
    clearLoading();
    notifications.show({
      title: `${title} ${action}`,
      message: "Successfull",
      autoClose: 2000,
      color: "green",
      icon: <IconCheck />
    });
  };

  const onError = <T extends { message: string }>(error: T) => {
    clearLoading();
    notifications.show({
      title: `${title} ${action} Error`,
      message: error.message,
      color: "red",
      icon: <IconX />
    });
  };

  return { onLoading, clearLoading, onSuccess, onError };
};

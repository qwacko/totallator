import { hideNotification, showNotification } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons";

export const notifyTemplate = (id: string, title: string, action: string) => {
  const onLoading = () => {
    showNotification({
      id: `${id}Loading`,
      loading: true,
      title: `Updating ${title}`,
      message: "",
      color: "blue",
      autoClose: false,
      disallowClose: true
    });
  };
  const clearLoading = () => {
    hideNotification(`${id}Loading`);
  };

  const onSuccess = () => {
    clearLoading();
    showNotification({
      title: `${title} ${action}`,
      message: "Successfull",
      autoClose: 2000,
      color: "green",
      icon: <IconCheck />
    });
  };

  const onError = <T extends { message: string }>(error: T) => {
    clearLoading();
    showNotification({
      title: `${title} ${action} Error`,
      message: error.message,
      color: "red",
      icon: <IconX />
    });
  };

  return { onLoading, clearLoading, onSuccess, onError };
};

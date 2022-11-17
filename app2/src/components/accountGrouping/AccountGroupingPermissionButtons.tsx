import { Button } from "@mantine/core";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons";
import { trpc } from "src/utils/trpc";
import { AccountGroupingReturnUser } from "./AccountGroupingCard";

export const AccountGroupingPermissionButtons = ({
  user,
  isAdmin,
  accountGroupingId,
}: {
  user: AccountGroupingReturnUser;
  isAdmin: boolean;
  accountGroupingId: string;
}) => {
  const utils = trpc.useContext();
  const { mutate: setUserAdmin, isLoading: setUserAdminLoading } =
    trpc.accountGroupings.setUserAdmin.useMutation({
      onSuccess: () => {
        utils.accountGroupings.invalidate();
      },
      onError: () => {
        utils.accountGroupings.invalidate();
      },
    });

  const { mutate: setUserView, isLoading: setUserViewLoading } =
    trpc.accountGroupings.setUserView.useMutation({
      onSuccess: () => {
        utils.accountGroupings.invalidate();
      },
      onError: () => {
        utils.accountGroupings.invalidate();
      },
    });

  const { mutate: removeUser, isLoading: removeUserLoading } =
    trpc.accountGroupings.removeUser.useMutation({
      onSuccess: () => {
        utils.accountGroupings.invalidate();
      },
      onError: () => {
        utils.accountGroupings.invalidate();
      },
    });

  return (
    <Button.Group>
      <Button
        size="xs"
        variant={user.admin ? "filled" : "light"}
        disabled={!user.admin && (!isAdmin || user.isUser)}
        onClick={() =>
          isAdmin &&
          !user.admin &&
          setUserAdmin({ accountGroupingId, userId: user.id })
        }
        loading={setUserAdminLoading}
        loaderPosition="center"
      >
        <IconEdit size={15} />
      </Button>
      <Button
        size="xs"
        variant="light"
        disabled={user.admin && (!isAdmin || user.isUser)}
        onClick={() =>
          isAdmin &&
          user.admin &&
          setUserView({ accountGroupingId, userId: user.id })
        }
        loading={setUserViewLoading}
        loaderPosition="center"
      >
        <IconEye size={15} />
      </Button>
      <Button
        size="xs"
        variant="light"
        color="red"
        disabled={!isAdmin || user.isUser}
        onClick={() =>
          isAdmin && removeUser({ accountGroupingId, userId: user.id })
        }
        loading={removeUserLoading}
        loaderPosition="center"
      >
        <IconTrash size={15} />
      </Button>
    </Button.Group>
  );
};

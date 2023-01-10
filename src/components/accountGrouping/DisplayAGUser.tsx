import { Group, Text, Container } from "@mantine/core";
import { AccountGroupingPermissionButtons } from "./AccountGroupingPermissionButtons";
import type { AccountGroupingReturnUser } from "./AccountGroupingCard";

export const DisplayAGUser = ({
  user,
  isAdmin,
  accountGroupingId,
}: {
  user: AccountGroupingReturnUser;
  isAdmin: boolean;
  accountGroupingId: string;
}) => {
  return (
    <Group>
      <Text size="sm">{user.name}</Text>
      <Container fluid />
      <Group>
        <AccountGroupingPermissionButtons
          user={user}
          isAdmin={isAdmin}
          accountGroupingId={accountGroupingId}
        />
      </Group>
    </Group>
  );
};

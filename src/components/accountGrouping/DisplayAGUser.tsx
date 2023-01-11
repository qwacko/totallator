import { Container, Group, Text } from "@mantine/core";

import type { AccountGroupingReturnUser } from "./AccountGroupingCard";
import { AccountGroupingPermissionButtons } from "./AccountGroupingPermissionButtons";

export const DisplayAGUser = ({
  user,
  isAdmin,
  accountGroupingId
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

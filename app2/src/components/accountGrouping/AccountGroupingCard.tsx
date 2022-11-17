import {
  Card,
  Group,
  Stack,
  Title,
  Text,
  Center,
  Container,
  Button,
} from "@mantine/core";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons";
import type { AppRouterOutputs } from "src/server/trpc/router/_app";
import { AccountGroupingEditPopup } from "./AccountGroupingEditForm";

export type AccountGroupingReturnSingle =
  AppRouterOutputs["accountGroupings"]["get"][0];

export type AccountGroupingReturnUser = AccountGroupingReturnSingle["users"][0];

export const AccountGroupingCard = ({
  data,
}: {
  data: AccountGroupingReturnSingle;
}) => {
  const sortedUsers = data.users.sort(
    (a, b) =>
      a.name?.localeCompare(b.name || "") || Number(a.admin) - Number(b.admin)
  );

  return (
    <Card shadow="md" withBorder>
      <Stack spacing="xs">
        <Center>
          <Group align="center">
            <Title order={5}>{data.title}</Title>
            {data.userIsAdmin && <AccountGroupingEditPopup data={data} />}
          </Group>
        </Center>
        <Center>
          <Text size="xs">{data.status}</Text>
        </Center>
        <Stack spacing="xs">
          {sortedUsers.map((user) => (
            <DisplayAGUser
              key={user.id}
              user={user}
              isAdmin={data.userIsAdmin}
            />
          ))}
        </Stack>
      </Stack>
    </Card>
  );
};

export const DisplayAGUser = ({
  user,
  isAdmin,
}: {
  user: AccountGroupingReturnUser;
  isAdmin: boolean;
}) => {
  return (
    <Group>
      <Text size="sm">{user.name}</Text>
      <Container fluid />
      <Group>
        <Button.Group>
          <Button
            size="xs"
            variant={user.admin ? "filled" : "light"}
            disabled={!user.admin && (!isAdmin || user.isUser)}
          >
            <IconEdit size={15} />
          </Button>
          <Button
            size="xs"
            variant="light"
            disabled={user.admin && (!isAdmin || user.isUser)}
            loaderPosition="center"
          >
            <IconEye size={15} />
          </Button>
          <Button
            size="xs"
            variant="light"
            color="red"
            disabled={!isAdmin || user.isUser}
          >
            <IconTrash size={15} />
          </Button>
        </Button.Group>
      </Group>
    </Group>
  );
};

import { Card, Group, Stack, Title, Text, Center } from "@mantine/core";
import type { AppRouterOutputs } from "src/server/trpc/router/_app";
import { AccountGroupingMenu } from "./AccountGroupingMenu";
import { DisplayAGUser } from "./DisplayAGUser";

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
            <AccountGroupingMenu data={data} />
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
              accountGroupingId={data.id}
            />
          ))}
        </Stack>
      </Stack>
    </Card>
  );
};

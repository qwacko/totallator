import { Card, Center, Group, Stack, Text, Title } from "@mantine/core";

import type { AppRouterOutputs } from "src/server/trpc/router/_app";
import { useAccountGroupingStats } from "src/utils/hooks/accountGroupings/useAccountGroupingStats";

import { StatsDisplay } from "../reusable/StatsDisplay";
import { StatsGraphDisplay } from "../reusable/StatsGraphDisplay";
import { AccountGroupingMenu } from "./AccountGroupingMenu";
import { DisplayAGUser } from "./DisplayAGUser";

export type AccountGroupingReturnSingle =
  AppRouterOutputs["accountGroupings"]["get"][0];

export type AccountGroupingReturnUser = AccountGroupingReturnSingle["users"][0];

export const AccountGroupingCard = ({
  data
}: {
  data: AccountGroupingReturnSingle;
}) => {
  const stats = useAccountGroupingStats({
    id: data.id
  });
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
        <Center>
          <Stack>
            <StatsDisplay stats={stats.data} />
            <StatsGraphDisplay data={stats.historicalData} hideBars />
            <StatsGraphDisplay data={stats.historicalData} hideLine />
          </Stack>
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

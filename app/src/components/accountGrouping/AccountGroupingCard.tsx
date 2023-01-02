import { Card, Group, Stack, Title, Text, Center } from "@mantine/core";
import type { AppRouterOutputs } from "src/server/trpc/router/_app";
import { AccountGroupingDelete } from "./AccountGroupingDelete";
import { AccountGroupingEditPopup } from "./AccountGroupingEditForm";
import { AccountGroupingExport } from "./AccountGroupingExport";
import { AccountGroupingSeed } from "./AccountGroupingSeed";
import { AccountGroupingAddUserPopup } from "./AcountGroupingAddUsrer";
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
            {data.userIsAdmin && (
              <>
                <AccountGroupingEditPopup data={data} />
                <AccountGroupingAddUserPopup
                  accountGroupingId={data.id}
                  title={data.title}
                />
              </>
            )}
            {data.userIsAdmin && (
              <AccountGroupingSeed accountGroupingId={data.id} />
            )}
            {data.userIsAdmin && (
              <AccountGroupingDelete
                accountGroupingId={data.id}
                title={data.title}
              />
            )}
            <AccountGroupingExport accountGroupingId={data.id} />
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

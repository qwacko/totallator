import { Center, Group, Stack, Title } from "@mantine/core";
import { useRouter } from "next/router";
import { useMemo } from "react";

import { AppLayout } from "src/components/layout/App";
import { SummaryDisplay } from "src/components/summary/SummaryDisplay";
import { generateFiltersFromURLIds } from "src/utils/generateFiltersFromURLIds";
import { trpc } from "src/utils/trpc";

const AccountSummaryPage = () => {
  const { query } = useRouter();
  const [filterAtom, id] = useMemo(
    () =>
      generateFiltersFromURLIds(query, (ids) => ({
        account: { id: { in: ids } }
      })),
    [query]
  );
  const accountsQuery = trpc.accounts.get.useQuery({
    filters: [{ id: { in: [id || ""] } }]
  });

  return (
    <AppLayout>
      <Stack>
        <Center>
          <Group>
            <Title>
              {accountsQuery?.data?.data && accountsQuery?.data?.data[0]
                ? `${accountsQuery?.data?.data[0].title} `
                : " "}
              Summary
            </Title>
          </Group>
        </Center>
        <SummaryDisplay initialFilter={filterAtom} />
      </Stack>
    </AppLayout>
  );
};

export default AccountSummaryPage;

import { Center, Group, Loader, Stack, Table, Text } from "@mantine/core";
import { useState } from "react";
import {
  accountsFilter,
  accountsSort,
  useAccounts,
} from "src/utils/hooks/accounts/useAccounts";
import { SortButton } from "../table/SortButton";
import { StatusFilterMenu } from "../table/StatusFilterMenu";
import { TextFilterMenu } from "../table/TextFilterMenu";
import { usePagination, PaginationDisplay } from "../table/usePagination";
import { AccountTableRow } from "./AccountTableRow";

export const AccountTable = () => {
  const [filter, setFilter] = useState<accountsFilter>({});
  const [sort, setSort] = useState<accountsSort | undefined>();
  const { accounts, isLoading } = useAccounts({ filter, sort });
  const pagination = usePagination({ items: accounts });

  if (!accounts || isLoading) {
    return (
      <Group>
        <Loader />
        <Text>Loading Accounts</Text>
      </Group>
    );
  }

  return (
    <Stack>
      <Table horizontalSpacing={2} verticalSpacing={2}>
        <thead>
          <tr>
            <th>Account Grouping</th>
            <th>
              <Group spacing={10}>
                <Text>Title</Text>
                <TextFilterMenu
                  filter={filter}
                  setFilter={setFilter}
                  targetKey="titleIncludes"
                />
                <SortButton sort={sort} setSort={setSort} targetKey="title" />
              </Group>
            </th>
            <th>
              <Group>
                <Text>Status</Text>
                <StatusFilterMenu filter={filter} setFilter={setFilter} />
                <SortButton sort={sort} setSort={setSort} targetKey="status" />
              </Group>
            </th>
          </tr>
        </thead>
        <tbody>
          {pagination.filteredItems.map((account) => {
            return <AccountTableRow key={account.id} id={account.id} />;
          })}
        </tbody>
      </Table>
      {pagination.filteredItems.length === 0 && <Center>No Items Found</Center>}
      <Center>
        <Group>
          <PaginationDisplay data={pagination} />
        </Group>
      </Center>
    </Stack>
  );
};

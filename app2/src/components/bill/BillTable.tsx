import { Center, Group, Loader, Stack, Table, Text } from "@mantine/core";
import { useState } from "react";
import {
  type billsFilter,
  useBills,
  type billsSort,
} from "src/utils/hooks/bills/useBills";
import { SortButton } from "../table/SortButton";
import { StatusFilterMenu } from "../table/StatusFilterMenu";
import { TextFilterMenu } from "../table/TextFilterMenu";
import { usePagination, PaginationDisplay } from "../table/usePagination";
import { BillTableRow } from "./BillTableRow";

export const BillTable = () => {
  const [filter, setFilter] = useState<billsFilter>({});
  const [sort, setSort] = useState<billsSort | undefined>();
  const { bills, isLoading } = useBills({ filter, sort });
  const pagination = usePagination({ items: bills });

  if (!bills || isLoading) {
    return (
      <Group>
        <Loader />
        <Text>Loading Bills</Text>
      </Group>
    );
  }

  return (
    <Stack>
      <Table>
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
          {pagination.filteredItems.map((bill) => {
            return <BillTableRow key={bill.id} id={bill.id} />;
          })}
        </tbody>
      </Table>
      <Center>
        <Group>
          <PaginationDisplay data={pagination} />
        </Group>
      </Center>
    </Stack>
  );
};

import { Center, Group, Loader, Stack, Table, Text } from "@mantine/core";
import { useState } from "react";
import {
  type budgetsFilter,
  useBudgets,
  type budgetsSort,
} from "src/utils/hooks/budgets/useBudgets";
import { SortButton } from "../table/SortButton";
import { StatusFilterMenu } from "../table/StatusFilterMenu";
import { TextFilterMenu } from "../table/TextFilterMenu";
import { usePagination, PaginationDisplay } from "../table/usePagination";
import { BudgetTableRow } from "./BudgetTableRow";

export const BudgetTable = () => {
  const [filter, setFilter] = useState<budgetsFilter>({});
  const [sort, setSort] = useState<budgetsSort | undefined>();
  const { budgets, isLoading } = useBudgets({ filter, sort });
  const pagination = usePagination({ items: budgets });

  if (!budgets || isLoading) {
    return (
      <Group>
        <Loader />
        <Text>Loading Budgets</Text>
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
          {pagination.filteredItems.map((budget) => {
            return <BudgetTableRow key={budget.id} id={budget.id} />;
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

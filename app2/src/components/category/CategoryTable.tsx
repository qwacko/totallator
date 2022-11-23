import { Center, Group, Loader, Stack, Table, Text } from "@mantine/core";
import { useState } from "react";
import {
  type categoriesSort,
  type catgoriesFilter,
  useCategories,
} from "src/utils/hooks/categories/useCategories";
import { SortButton } from "../table/SortButton";
import { StatusFilterMenu } from "../table/StatusFilterMenu";
import { TextFilterMenu } from "../table/TextFilterMenu";
import { usePagination, PaginationDisplay } from "../table/usePagination";
import { CategoryTableRow } from "./CategoryTableRow";

export const CategoryTable = () => {
  const [filter, setFilter] = useState<catgoriesFilter>({});
  const [sort, setSort] = useState<categoriesSort | undefined>();
  const { categories, isLoading } = useCategories({ filter, sort });
  const pagination = usePagination({ items: categories });

  if (!categories || isLoading) {
    return (
      <Group>
        <Loader />
        <Text>Loading Categories</Text>
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
          {pagination.filteredItems.map((category) => {
            return <CategoryTableRow key={category.id} id={category.id} />;
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

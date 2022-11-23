import { Center, Group, Loader, Stack, Table, Text } from "@mantine/core";
import { useState } from "react";
import {
  type tagsFilter,
  type tagsSort,
  useTags,
} from "src/utils/hooks/categories/useTags";
import { SortButton } from "../table/SortButton";
import { StatusFilterMenu } from "../table/StatusFilterMenu";
import { TextFilterMenu } from "../table/TextFilterMenu";
import { usePagination, PaginationDisplay } from "../table/usePagination";
import { TagTableRow } from "./TagTableRow";

export const TagTable = () => {
  const [filter, setFilter] = useState<tagsFilter>({});
  const [sort, setSort] = useState<tagsSort | undefined>();
  const { tags, isLoading } = useTags({ filter, sort });
  const pagination = usePagination({ items: tags });

  if (!tags || isLoading) {
    return (
      <Group>
        <Loader />
        <Text>Loading Tags</Text>
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
          {pagination.filteredItems.map((tag) => {
            return <TagTableRow key={tag.id} id={tag.id} />;
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

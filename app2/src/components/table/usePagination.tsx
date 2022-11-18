import { Group, Pagination, Select } from "@mantine/core";
import { useState } from "react";

export const usePagination = <T extends Record<string, unknown>>({
  items,
  initialPerPage = 10,
  initialPage = 1,
}: {
  items: T[] | undefined;
  initialPerPage?: number;
  initialPage?: number;
}) => {
  const count = items ? items.length : 0;
  const [page, setPage] = useState(initialPage);
  const [perPage, setPerPage] = useState(initialPerPage);

  if (page > 1 && page * perPage > count) {
    setPage(1);
  }

  const filteredItems = items
    ? items.slice((page - 1) * perPage, page * perPage)
    : [];

  const perPageSelect = {
    value: perPage.toString(),
    data: ["1", "5", "10", "20", "50", "100"],
    onChange: (e: string) => setPerPage(Number(e)),
  };

  const pagination = {
    page,
    onChange: setPage,
    total: Math.ceil(count / perPage),
  };

  return {
    pagination,
    perPageSelect,
    filteredItems,
    perPage,
    setPerPage,
    page,
    setPage,
  };
};

export const PaginationDisplay = ({
  data,
}: {
  data: ReturnType<typeof usePagination>;
}) => {
  return (
    <Group>
      <Select size="xs" {...data.perPageSelect} />
      <Pagination size="sm" radius="xs" {...data.pagination} />
    </Group>
  );
};

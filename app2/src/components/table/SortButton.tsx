import { Button } from "@mantine/core";
import { IconArrowDown, IconArrowsSort, IconArrowUp } from "@tabler/icons";

export type SortOrders = "asc" | "desc";
export type SortType<T extends string> = { key: T; order?: "asc" | "desc" };

export const SortButton = <T extends string>({
  sort,
  setSort,
  targetKey,
}: {
  sort: SortType<T> | undefined;
  setSort: (data: SortType<T> | undefined) => void;
  targetKey: T;
}) => {
  const order: SortOrders | undefined =
    sort && sort.key === targetKey ? sort.order : undefined;

  const toggleSort = () => {
    if (order === "asc") {
      setSort({ key: targetKey, order: "desc" });
    } else if (order === "desc") {
      setSort(undefined);
    } else {
      setSort({ key: targetKey, order: "asc" });
    }
  };

  return (
    <Button variant={order ? "outline" : "subtle"} compact onClick={toggleSort}>
      {order === "asc" && <IconArrowUp size={15} />}
      {order === "desc" && <IconArrowDown size={15} />}
      {order === undefined && <IconArrowsSort size={15} />}
    </Button>
  );
};

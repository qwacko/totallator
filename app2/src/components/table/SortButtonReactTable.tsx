import { Button } from "@mantine/core";
import { IconArrowDown, IconArrowsSort, IconArrowUp } from "@tabler/icons";
import type { SortingState, Updater } from "@tanstack/react-table";

export const SortButtonReactTable = ({
  sort,
  setSort,
  targetKey,
  sortable,
}: {
  sort: SortingState;
  setSort: (updater: Updater<SortingState>) => void;
  targetKey: string;
  sortable: boolean;
}) => {
  if (!sortable) {
    return <></>;
  }

  const thisSort = sort.find((item) => item.id === targetKey);

  const addSort = () => {
    setSort(() => [{ id: targetKey, desc: false }]);
  };

  const removeSort = () => {
    setSort((data) => data.filter((item) => item.id !== targetKey));
  };

  const updateSort = (newDir: boolean) => {
    setSort((data) =>
      data.map((item) =>
        item.id === targetKey ? { ...item, desc: newDir } : item
      )
    );
  };

  if (!thisSort) {
    return (
      <Button variant="subtle" compact onClick={addSort}>
        <IconArrowsSort size={15} />
      </Button>
    );
  }

  if (thisSort.desc) {
    return (
      <Button variant="outline" compact onClick={removeSort}>
        <IconArrowDown size={15} />
      </Button>
    );
  }

  return (
    <Button variant="outline" compact onClick={() => updateSort(true)}>
      <IconArrowUp size={15} />
    </Button>
  );
};

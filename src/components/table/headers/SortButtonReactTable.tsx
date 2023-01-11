import { Button } from "@mantine/core";
import { IconArrowDown, IconArrowUp, IconArrowsSort } from "@tabler/icons";
import type { SortingState, Updater } from "@tanstack/react-table";

export const SortButtonReactTable = ({
  sort,
  setSort,
  targetKey,
  sortable
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
    console.log("Adding Sort", targetKey);
    console.log("Current Sort", sort);
    setSort([{ id: targetKey, desc: false }]);
  };

  const removeSort = () => {
    console.log("Removing Sort", targetKey);
    console.log("Current Sort", sort);
    setSort(sort.filter((item) => item.id !== targetKey));
  };

  const updateSort = (newDir: boolean) => {
    console.log("Updating Sort", targetKey);
    console.log("Current Sort", sort);
    setSort(
      sort.map((item) =>
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

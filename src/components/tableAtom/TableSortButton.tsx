import { Button, Indicator, Text } from "@mantine/core";
import {
  IconArrowsSort,
  IconSortAscending,
  IconSortDescending
} from "@tabler/icons";

import {
  type TableSortAtomType,
  useToggleSort
} from "src/utils/hooks/table/useTableSortAtom";

export const TableSortButton = <T extends string>({
  sortAtom,
  columnId
}: {
  sortAtom: TableSortAtomType<T>;
  columnId: T;
}) => {
  const [sortState, toggleSort] = useToggleSort(sortAtom, columnId);

  const sortDirectionDesc = sortState?.value ? sortState.value.desc : undefined;
  const sortDirectionIndex = sortState ? sortState.index + 1 : undefined;

  return (
    <Indicator
      label={<Text size="xs">{sortDirectionIndex}</Text>}
      disabled={sortDirectionDesc === undefined}
      size={15}
      color="blue"
    >
      <Button
        color="gray"
        onClick={() => toggleSort()}
        size="xs"
        variant={sortDirectionDesc === undefined ? "outline" : "filled"}
      >
        {sortDirectionDesc === true && <IconSortDescending size={12} />}
        {sortDirectionDesc === false && <IconSortAscending size={12} />}
        {sortDirectionDesc === undefined && <IconArrowsSort size={12} />}
      </Button>
    </Indicator>
  );
};

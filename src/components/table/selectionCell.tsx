import { Center, Checkbox } from "@mantine/core";
import { type CellContext } from "@tanstack/react-table";

export const selectionCell = <T, U>(cell: CellContext<T, U>) => {
  return (
    <Center>
      <Checkbox
        disabled={!cell.row.getCanSelect()}
        checked={cell.row.getIsSelected()}
        onClick={() => cell.row.toggleSelected()}
      />
    </Center>
  );
};

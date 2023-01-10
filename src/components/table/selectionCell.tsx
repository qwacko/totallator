import { type CellContext } from "@tanstack/react-table";
import { Center, Checkbox } from "@mantine/core";

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

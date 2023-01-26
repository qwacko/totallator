import { Stack, Table } from "@mantine/core";
import { type Atom, useAtom } from "jotai";
import { type ReactNode } from "react";

export const TableSimpleAtom = ({
  rowsAtom,
  header,
  row
}: {
  rowsAtom: Atom<string[]>;
  header: ReactNode;
  row: (rowId: string) => ReactNode;
}) => {
  const [rowIds] = useAtom(rowsAtom);

  return (
    <Stack>
      <Table horizontalSpacing={2} verticalSpacing={2}>
        <thead>{header}</thead>
        <tbody>
          {rowIds.map((currentRowId) => (
            <tr key={currentRowId}>{row(currentRowId)}</tr>
          ))}
        </tbody>
      </Table>
    </Stack>
  );
};

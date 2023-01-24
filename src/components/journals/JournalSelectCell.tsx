import { Center, Checkbox, Stack, Text } from "@mantine/core";
import type { CellContext, HeaderContext } from "@tanstack/react-table";
import { Provider as JotaiProvider, atom, useAtom } from "jotai";
import { type ReactNode, useMemo } from "react";

import type { JournalsMergedType } from "src/utils/hooks/journals/useJournals";

const scope = Symbol();
export const selectionIdsAtom = atom<string[]>([]);

export const useIDSelected = (id: string) => {
  const selectedAtom = useMemo(
    () =>
      atom<boolean, "add" | "remove" | "toggle">(
        (get) => get(selectionIdsAtom).includes(id),
        (get, set, action) => {
          const found = get(selectionIdsAtom).includes(id);
          if ((action === "add" && !found) || (action === "toggle" && !found)) {
            set(selectionIdsAtom, [...get(selectionIdsAtom), id]);
          }
          if (
            (action === "remove" && found) ||
            (action === "toggle" && found)
          ) {
            set(
              selectionIdsAtom,
              get(selectionIdsAtom).filter((item) => item !== id)
            );
          }
          // you can set as many atoms as you want at the same time
        }
      ),
    [id]
  );
  const [cellSelected, mutate] = useAtom(selectedAtom, scope);

  const add = () => mutate("add");
  const remove = () => mutate("remove");
  const toggle = () => mutate("toggle");

  return [cellSelected, { add, remove, toggle }] as const;
};

export const JournalEditingColumnHeader = <U,>(
  header: HeaderContext<JournalsMergedType, U>
) => {
  const [selectedIds, setSelectedIds] = useAtom(selectionIdsAtom, scope);
  const checked = selectedIds.length > 0;

  return (
    <Center>
      <Stack>
        <Text>Editing</Text>
        <Checkbox
          px="md"
          checked={checked}
          transitionDuration={0}
          onChange={() => {
            if (checked) {
              setSelectedIds([]);
            } else {
              const allIds = header.table
                .getRowModel()
                .rows.map((item) => item.id);
              setSelectedIds(allIds);
            }
          }}
        />
      </Stack>
    </Center>
  );
};

export const JournalSelectCell = <U,>(
  cell: CellContext<JournalsMergedType, U>
) => {
  const [cellSelected, cellSelectedActions] = useIDSelected(cell.row.id);

  return (
    <Center>
      <Checkbox
        px="md"
        checked={cellSelected}
        onChange={() => {
          cellSelectedActions.toggle();
        }}
        transitionDuration={0}
      />
    </Center>
  );
};

export const JournalSelectProvider = ({
  children
}: {
  children: ReactNode;
}) => {
  return <JotaiProvider scope={scope}>{children}</JotaiProvider>;
};

import deepEquals from "fast-deep-equal";
import { atom, useAtom } from "jotai";
import { selectAtom } from "jotai/utils";
import { useMemo } from "react";

export type TableSortType<T extends string> = {
  id: T;
  desc: boolean;
};

export const tableSortAtom = <T extends string>(
  initialSort: TableSortType<T>[] = []
) => atom<TableSortType<T>[]>(initialSort);

export type TableSortAtomType<T extends string> = ReturnType<
  typeof tableSortAtom<T>
>;

export const useToggleSort = <T extends string>(
  targetAtom: TableSortAtomType<T>,
  key: T
) => {
  const toggleSortAtom = useMemo(() => {
    const readAtom = selectAtom(
      targetAtom,
      (current) => {
        const value = current.find((item) => item.id === key);
        const index = current.findIndex((item) => item.id === key);
        return { value, index };
      },
      deepEquals
    );
    return atom(
      (get) => get(readAtom),
      (get, set) => {
        const current = get(targetAtom);
        const matching = current.find((item) => item.id === key);
        if (matching && matching.desc) {
          set(
            targetAtom,
            current.filter((item) => item.id !== key)
          );
        } else if (matching && !matching.desc) {
          set(
            targetAtom,
            current.map((item) =>
              item.id === key ? { ...item, desc: true } : item
            )
          );
        } else {
          set(targetAtom, [...current, { id: key, desc: false }]);
        }
      }
    );
  }, [targetAtom, key]);

  return useAtom(toggleSortAtom);
};

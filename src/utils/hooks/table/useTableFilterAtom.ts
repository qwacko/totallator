import deepEquals from "fast-deep-equal";
import { atom, useAtom } from "jotai";
import { selectAtom } from "jotai/utils";
import { useMemo } from "react";

export type TableFilterType<T extends string> = {
  id: T;
  value: string;
};

export const tableFilterAtom = <T extends string>(
  initialFilter: TableFilterType<T>[] = []
) => atom<TableFilterType<T>[]>(initialFilter);

export type TableFilterAtomType<T extends string> = ReturnType<
  typeof tableFilterAtom<T>
>;

export const useMemoTableFilterAtom = <T extends string>(
  initialFilter: TableFilterType<T>[] = []
) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const sort = useMemo(() => tableFilterAtom(initialFilter), []);

  return sort;
};

export const useFilterAtom = <T extends string>(
  targetAtom: TableFilterAtomType<T>,
  key: T
) => {
  const updateFilterAtom = useMemo(() => {
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
      (
        get,
        set,
        value: { action: "clear" } | { action: "update"; value: string }
      ) => {
        const current = get(targetAtom);
        console.log("Updating Atom", { current, value });
        if (value.action === "clear") {
          set(
            targetAtom,
            current.filter((item) => item.id !== key)
          );
        }
        if (value.action === "update") {
          const exists = current.find((item) => item.id === key);
          console.log("Exists", exists);
          if (exists) {
            set(
              targetAtom,
              current.map((item) =>
                item.id === key ? { ...item, value: value.value } : item
              )
            );
          } else {
            const newValue = [...current, { id: key, value: value.value }];
            console.log("New Value", newValue);
            set(targetAtom, newValue);
          }
        }
      }
    );
  }, [targetAtom, key]);

  return useAtom(updateFilterAtom);
};

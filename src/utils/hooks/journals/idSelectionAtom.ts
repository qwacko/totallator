import deepEquals from "fast-deep-equal";
import { atom } from "jotai";
import { selectAtom } from "jotai/utils";

export const idSelectionAtom = () => {
  const selectionAtom = atom<string[]>([]);

  const selectionAtomById = (id: string) => {
    const isSelectedAtom = selectAtom(
      selectionAtom,
      (data) => data.includes(id),
      deepEquals
    );

    return atom(
      (get) => get(isSelectedAtom),
      (get, set) => {
        const currentEditing = get(selectionAtom);
        if (currentEditing.includes(id)) {
          set(
            selectionAtom,
            currentEditing.filter((item) => item !== id)
          );
        } else {
          set(selectionAtom, [...currentEditing, id]);
        }
      }
    );
  };

  return { selectionAtom, selectionAtomById };
};

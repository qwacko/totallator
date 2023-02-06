import deepEquals from "fast-deep-equal";
import type { Atom, PrimitiveAtom } from "jotai";
import { selectAtom } from "jotai/utils";

export const selectDeepEqualAtom = <T, U>(
  inputAtom: PrimitiveAtom<T> | Atom<T>,
  selectFunction: (data: T) => U
) => selectAtom(inputAtom, selectFunction, deepEquals);

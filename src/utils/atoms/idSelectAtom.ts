import type { PrimitiveAtom } from "jotai";

import { selectDeepEqualAtom } from "./selectDeepEqualAtom";

export const idSelectAtom = <T extends { id: string }>(
  inputAtom: PrimitiveAtom<T[]>
) => selectDeepEqualAtom(inputAtom, (data) => data.map((item) => item.id));

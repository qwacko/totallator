import type { JournalsReturnType } from "src/server/trpc/router/_app";

export const buildMergedData = ({ input }: { input: JournalsReturnType[] }) => {
  return input;
};
export type MergedDataType = ReturnType<typeof buildMergedData>;
export type JournalsMergedType = MergedDataType[0];

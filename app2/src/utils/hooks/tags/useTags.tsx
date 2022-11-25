import { trpc } from "src/utils/trpc";

export const useTags = () => {
  const data = trpc.tags.get.useQuery();
  return data;
};

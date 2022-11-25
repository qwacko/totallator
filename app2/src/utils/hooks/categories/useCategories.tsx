import { trpc } from "src/utils/trpc";

export const useCategories = () => {
  const data = trpc.categories.get.useQuery();
  return data;
};

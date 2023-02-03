import { useCategoryStats } from "src/utils/hooks/categories/useCategoryStats";

import { StatsDisplay } from "../reusable/StatsDisplay";

export const CategoryStats = ({ id }: { id: string }) => {
  const { data: stats } = useCategoryStats({ id });

  return <StatsDisplay stats={stats} />;
};

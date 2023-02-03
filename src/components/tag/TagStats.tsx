import { useTagStats } from "src/utils/hooks/tags/useTagStats";

import { StatsDisplay } from "../reusable/StatsDisplay";

export const TagStats = ({ id }: { id: string }) => {
  const { data: stats } = useTagStats({ id });

  return <StatsDisplay stats={stats} />;
};

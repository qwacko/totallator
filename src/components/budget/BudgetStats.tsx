import { useBudgetStats } from "src/utils/hooks/budgets/useBudgetStats";

import { StatsDisplay } from "../reusable/StatsDisplay";

export const BudgetStats = ({ id }: { id: string }) => {
  const { data: stats } = useBudgetStats({ id });

  return <StatsDisplay stats={stats} />;
};

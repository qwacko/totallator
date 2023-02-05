import { Group } from "@mantine/core";

import { useBudgetStats } from "src/utils/hooks/budgets/useBudgetStats";

import { StatsDisplay } from "../reusable/StatsDisplay";
import { StatsGraphDisplay } from "../reusable/StatsGraphDisplay";

export const BudgetStats = ({ id }: { id: string }) => {
  const { data: stats, historicalData } = useBudgetStats({ id });

  return (
    <Group>
      <StatsDisplay stats={stats} />
      <StatsGraphDisplay data={historicalData} />
    </Group>
  );
};

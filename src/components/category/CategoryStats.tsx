import { Group } from "@mantine/core";

import { useCategoryStats } from "src/utils/hooks/categories/useCategoryStats";

import { StatsDisplay } from "../reusable/StatsDisplay";
import { StatsGraphDisplay } from "../reusable/StatsGraphDisplay";

export const CategoryStats = ({ id }: { id: string }) => {
  const { data: stats, historicalData } = useCategoryStats({ id });

  return (
    <Group>
      <StatsDisplay stats={stats} />
      <StatsGraphDisplay data={historicalData} />
    </Group>
  );
};

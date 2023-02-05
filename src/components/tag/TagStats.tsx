import { Group } from "@mantine/core";

import { useTagStats } from "src/utils/hooks/tags/useTagStats";

import { StatsDisplay } from "../reusable/StatsDisplay";
import { StatsGraphDisplay } from "../reusable/StatsGraphDisplay";

export const TagStats = ({ id }: { id: string }) => {
  const { data: stats, historicalData } = useTagStats({ id });

  return (
    <Group>
      <StatsDisplay stats={stats} />
      <StatsGraphDisplay data={historicalData} />
    </Group>
  );
};

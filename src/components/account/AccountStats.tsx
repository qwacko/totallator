import { Group } from "@mantine/core";

import { useAccountStats } from "src/utils/hooks/accounts/useAccountStats";

import { StatsDisplay } from "../reusable/StatsDisplay";
import { StatsGraphDisplay } from "../reusable/StatsGraphDisplay";

export const AccountStats = ({ id }: { id: string }) => {
  const { data: stats, historicalData } = useAccountStats({ id });

  return (
    <Group>
      <StatsDisplay stats={stats} />
      <StatsGraphDisplay data={historicalData} />
    </Group>
  );
};

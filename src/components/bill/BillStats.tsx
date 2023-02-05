import { Group } from "@mantine/core";

import { useBillStats } from "src/utils/hooks/bills/useBillStats";

import { StatsDisplay } from "../reusable/StatsDisplay";
import { StatsGraphDisplay } from "../reusable/StatsGraphDisplay";

export const BillStats = ({ id }: { id: string }) => {
  const { data: stats, historicalData } = useBillStats({ id });

  return (
    <Group>
      <StatsDisplay stats={stats} />
      <StatsGraphDisplay data={historicalData} />
    </Group>
  );
};

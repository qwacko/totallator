import { Group } from "@mantine/core";
import { Bar, ComposedChart, Line, Tooltip } from "recharts";

import { useAccountStats } from "src/utils/hooks/accounts/useAccountStats";

import { StatsDisplay } from "../reusable/StatsDisplay";

export const AccountStats = ({ id }: { id: string }) => {
  const { data: stats, historicalData } = useAccountStats({ id });

  return (
    <Group>
      <StatsDisplay stats={stats} />
      <ComposedChart data={historicalData} width={200} height={60}>
        <Line type="monotone" dataKey="total" stroke="#8884d8" dot={false} />
        <Bar dataKey="positive" fill="#8884d8" />
        <Bar dataKey="negative" fill="#8884d8" />
        <Tooltip />
      </ComposedChart>
    </Group>
  );
};

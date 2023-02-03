import { useBillStats } from "src/utils/hooks/bills/useBillStats";

import { StatsDisplay } from "../reusable/StatsDisplay";

export const BillStats = ({ id }: { id: string }) => {
  const { data: stats } = useBillStats({ id });

  return <StatsDisplay stats={stats} />;
};

import { useAccountStats } from "src/utils/hooks/accounts/useAccountStats";

import { StatsDisplay } from "../reusable/StatsDisplay";

export const AccountStats = ({ id }: { id: string }) => {
  const { data: stats } = useAccountStats({ id });

  return <StatsDisplay stats={stats} />;
};

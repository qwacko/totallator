import { useAccountStats } from "../../utils/hooks/accounts/useAccountStats";

export const AccountStats = ({ id }: { id: string }) => {
  const { data: stats } = useAccountStats({ id });

  return <>{JSON.stringify(stats)}</>;
};

import { Text } from "@mantine/core";

import { useDisplayCurrency } from "src/components/reusable/DisplayCurrency";

import { useAccountStats } from "../../utils/hooks/accounts/useAccountStats";

export const AccountStats = ({ id }: { id: string }) => {
  const { data: stats } = useAccountStats({ id });
  const formatter = useDisplayCurrency();

  if (stats) {
    return (
      <>
        {stats?._sum?.amount !== null ? (
          <Text color={stats._sum.amount < 0 ? "red" : undefined}>
            {formatter(stats._sum.amount)}
          </Text>
        ) : (
          <></>
        )}
      </>
    );
  }
  return <></>;
};

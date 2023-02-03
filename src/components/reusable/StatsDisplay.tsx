import { Text } from "@mantine/core";

import type { SummaryReturnValidationType } from "src/utils/validation/summary/summaryReturnValidation";

import { useDisplayCurrency } from "./DisplayCurrency";

export const StatsDisplay = (props: {
  stats: SummaryReturnValidationType[0] | undefined;
}) => {
  const formatter = useDisplayCurrency();

  if (props.stats) {
    return (
      <>
        {props.stats._sum?.amount !== null ? (
          <Text color={props.stats._sum.amount < 0 ? "red" : undefined}>
            {formatter(props.stats._sum.amount)}
          </Text>
        ) : (
          <></>
        )}
      </>
    );
  }
  return <></>;
};

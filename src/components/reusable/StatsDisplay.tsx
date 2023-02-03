import { Group, Stack, Text } from "@mantine/core";
import { format } from "date-fns";

import { useLoggedInUser } from "src/utils/hooks/user/useLoggedInUser";
import type { SummaryReturnValidationType } from "src/utils/validation/summary/summaryReturnValidation";

import { useDisplayCurrency } from "./DisplayCurrency";

export const StatsDisplay = (props: {
  stats: SummaryReturnValidationType[0] | undefined;
}) => {
  const formatter = useDisplayCurrency();
  const { dateFormat } = useLoggedInUser();

  if (props.stats) {
    return (
      <Group>
        <Stack spacing={0} align="end">
          {props.stats._sum?.amount !== null && (
            <Text
              color={props.stats._sum.amount < 0 ? "red" : undefined}
              size="lg"
            >
              {formatter(props.stats._sum.amount)}
            </Text>
          )}
          {props.stats._count?._all !== null &&
            props.stats._max.date !== null && (
              <Text size="xs">
                ({props.stats._count._all} Trans, Last{" "}
                {format(props.stats._max.date, dateFormat)})
              </Text>
            )}
        </Stack>
      </Group>
    );
  }
  return <></>;
};

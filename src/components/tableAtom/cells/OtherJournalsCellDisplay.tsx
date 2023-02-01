import { Group, Stack } from "@mantine/core";
import { useEffect, useState } from "react";

import type { MergedDataType } from "src/utils/hooks/journals/helpers/buildMergedData";
import { useUpdateJournals } from "src/utils/hooks/journals/useUpdateJournal";
import type { UpdateJournalDataInputType } from "src/utils/validation/journalEntries/updateJournalValidation";

import { AccountSelectionWithPopoverEdit } from "./AccountSelectionWithPopoverEdit";
import { NumberCellWithPopoverEdit } from "./NumberCellWithPopoverEdit";

export const OtherJournalsCellDisplay = ({
  rowData,
  editing,
  disableEditing,
  currencyFormat
}: {
  rowData: MergedDataType[0];
  editing: boolean;
  disableEditing: boolean;
  currencyFormat: (value: number | bigint) => string;
}) => {
  const otherJournals = rowData.otherJournals.filter(
    (item) => item.id !== rowData.id
  );
  const showAmounts = otherJournals.length > 1;

  return (
    <Stack>
      {otherJournals.map((otherJournal) => (
        <OtherJournalsSingleDisplay
          data={otherJournal}
          key={otherJournal.id}
          showAmounts={showAmounts}
          editing={editing}
          accountGroupingId={rowData.accountGroupingId}
          disableEditing={disableEditing}
          currencyFormat={currencyFormat}
        />
      ))}
    </Stack>
  );
};

const OtherJournalsSingleDisplay = ({
  data,
  showAmounts,
  editing,
  accountGroupingId,
  disableEditing,
  currencyFormat
}: {
  data: MergedDataType[0]["otherJournals"][0];
  showAmounts: boolean;
  editing: boolean;
  accountGroupingId: string;
  disableEditing: boolean;
  currencyFormat: (value: number | bigint) => string;
}) => {
  const [accountId, setAccountId] = useState<string>(data.accountId);
  const [amount, setAmount] = useState(data.amount);

  useEffect(() => {
    if (data.accountId !== accountId) {
      setAccountId(data.accountId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.accountId]);

  useEffect(() => {
    if (data.amount !== amount) {
      setAmount(data.amount);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.amount]);

  const mutation = useUpdateJournals({});
  const updateTargetJournal = (updatedData: UpdateJournalDataInputType) => {
    mutation.mutate({
      filters: [{ id: { in: [data.id] } }],
      data: updatedData
    });
  };

  return (
    <Group>
      <AccountSelectionWithPopoverEdit
        accountGroupingId={accountGroupingId}
        value={accountId}
        size="xs"
        disabled={disableEditing}
        onChange={(e) => e && accountId !== data.accountId && setAccountId(e)}
        onBlur={() =>
          accountId !== data.accountId && updateTargetJournal({ accountId })
        }
        createExpenseOption
        onCreateSuccess={(e) => setAccountId(e)}
        searchable
        title={data.account?.title || ""}
        editing={editing}
      />
      {showAmounts && (
        <NumberCellWithPopoverEdit
          value={amount}
          onChange={(e) => setAmount(e || 0)}
          size="xs"
          disabled={disableEditing}
          onBlur={() =>
            amount !== data.amount && updateTargetJournal({ amount })
          }
          precision={2}
          format={currencyFormat}
          editing={editing}
        />
      )}
    </Group>
  );
};

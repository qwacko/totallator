import {
  Center,
  Checkbox,
  Container,
  Group,
  HoverCard,
  Text
} from "@mantine/core";
import { IconCheck, IconEyeCheck, IconReport } from "@tabler/icons";
import deepEquals from "fast-deep-equal";
import { useAtom } from "jotai";
import { selectAtom } from "jotai/utils";
import { type ReactNode, useEffect, useMemo, useState } from "react";

import type { JournalTableConfigAtomReturn } from "src/utils/hooks/journals/useJournalsSimple";
import { useUpdateJournals } from "src/utils/hooks/journals/useUpdateJournal";
import { useLoggedInUser } from "src/utils/hooks/user/useLoggedInUser";
import type { UpdateJournalDataInputType } from "src/utils/validation/journalEntries/updateJournalValidation";
import { currencyFormatter } from "src/utils/validation/user/currencyFormats";

import { JournalCommandButtons } from "../JournalCommandButtons";
import type { CombinedJournalDataAtomType } from "./CombinedJournalDataAtomType";
import { AccountSelectionWithPopoverEdit } from "./cells/AccountSelectionWithPopoverEdit";
import { BillSelectionWithPopoverEdit } from "./cells/BillSelectionWithPopoverEdit";
import { BudgetSelectionWithPopoverEdit } from "./cells/BudgetSelectionWithPopoverEdit";
import { CategorySelectionWithPopoverEdit } from "./cells/CategorySelectionWithPopoverEdit";
import { DatePickerWithPopoverEdit } from "./cells/DatePickerWithPopoverEdit";
import { NumberCellWithPopoverEdit } from "./cells/NumberCellWithPopoverEdit";
import { TagSelectionWithPopoverEdit } from "./cells/TagSelectionWithPopoverEdit";
import { TextCellWithPopoverEdit } from "./cells/TextCellWithPopoverEdit";

export const JournalTableRowDisplay = ({
  rowId,
  journalData,
  config
}: {
  rowId: string;
  journalData: CombinedJournalDataAtomType;
  config: JournalTableConfigAtomReturn;
}) => {
  const { dateFormat, dayjsFormat, user } = useLoggedInUser();
  const formatter = currencyFormatter(user ? user.currencyFormat : "USD");

  const rowDataAtom = useMemo(
    () =>
      selectAtom(
        journalData.mergedJournalDataAtom,
        (data) => data.find((item) => item.id === rowId),
        deepEquals
      ),
    [rowId, journalData.mergedJournalDataAtom]
  );

  const [rowData] = useAtom(rowDataAtom);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [amount, setAmount] = useState(0);
  const [currentRowData, setCurrentRowData] = useState<{
    accountId: string;
    tagId?: string | null | undefined;
    billId?: string | null | undefined;
    budgetId?: string | null | undefined;
    categoryId?: string | null | undefined;
  }>({ accountId: "" });

  const resetRowData = () => {
    if (rowData) {
      setDescription(rowData.description);
      setDate(rowData.date);
      setAmount(rowData.amount);
      setCurrentRowData({
        accountId: rowData.accountId,
        tagId: rowData.tagId,
        billId: rowData.billId,
        categoryId: rowData.categoryId,
        budgetId: rowData.budgetId
      });
    }
  };

  useEffect(() => {
    resetRowData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowData]);

  const editingAtom = useMemo(
    () => config.editingByIdAtom(rowId),
    [rowId, config]
  );
  const [editing, toggleEditing] = useAtom(editingAtom);

  const selectedAtom = useMemo(
    () => config.selectedByIdAtom(rowId),
    [rowId, config]
  );
  const [selected, toggleSelected] = useAtom(selectedAtom);

  const { mutate } = useUpdateJournals({
    onError: () => resetRowData()
  });

  const updateJournal = (newData: UpdateJournalDataInputType) => {
    mutate({
      filters: [{ id: { in: [rowId] } }],
      maxUpdated: 2,
      data: newData
    });
  };

  const disableEditing = rowData
    ? !rowData.userIsAdmin || rowData.complete
    : true;

  if (!rowData) return <></>;

  return (
    <>
      <CustomTd>
        <Checkbox
          checked={selected}
          onChange={() => toggleSelected()}
          transitionDuration={0}
        />
      </CustomTd>
      <CustomTd>
        <Checkbox
          checked={editing}
          onChange={() => toggleEditing()}
          transitionDuration={0}
        />
      </CustomTd>
      <CustomTd>
        {editing && <JournalCommandButtons data={rowData} />}
        {!editing && (
          <HoverCard shadow="md" openDelay={100}>
            <HoverCard.Target>
              <Group>
                {!rowData.complete &&
                  !rowData.dataChecked &&
                  !rowData.reconciled && <Container w={14} h={14} />}
                {rowData.complete && <IconCheck size={14} color="green" />}
                {!rowData.complete && rowData.dataChecked && (
                  <IconEyeCheck size={14} color="blue" />
                )}
                {!rowData.complete && rowData.reconciled && (
                  <IconReport size={14} color="blue" />
                )}
              </Group>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <JournalCommandButtons data={rowData} />
            </HoverCard.Dropdown>
          </HoverCard>
        )}
      </CustomTd>
      <CustomTd>
        <DatePickerWithPopoverEdit
          value={date}
          disabled={disableEditing}
          size="xs"
          clearable={false}
          transitionDuration={0}
          inputFormat={dayjsFormat}
          onChange={(e) => (e ? setDate(e) : undefined)}
          onComplete={() => updateJournal({ date })}
          editing={editing}
          dateFnsFormat={dateFormat || ""}
          modalProps={{ withinPortal: true }}
          withinPortal
        />
      </CustomTd>
      <CustomTd>
        <AccountSelectionWithPopoverEdit
          accountGroupingId={rowData.accountGroupingId || ""}
          value={currentRowData.accountId}
          size="xs"
          disabled={disableEditing}
          onChange={(e) =>
            e && setCurrentRowData({ ...currentRowData, accountId: e })
          }
          onBlur={() =>
            rowData.accountId !== currentRowData.accountId &&
            updateJournal(currentRowData)
          }
          createExpenseOption
          onCreateSuccess={(e) =>
            setCurrentRowData({ ...currentRowData, accountId: e })
          }
          searchable
          title={rowData.account?.title || ""}
          editing={editing}
        />
      </CustomTd>
      <CustomTd>
        <Text>
          {rowData.otherJournals
            .filter((item) => item.id !== rowData.id)
            .map((item) => (item.account ? item.account.title : ""))
            .join(", ")}
        </Text>
      </CustomTd>
      <CustomTd>
        <TextCellWithPopoverEdit
          value={description}
          onChange={(e) => {
            console.log("New Description Value", e.target.value);
            setDescription(e.target.value);
          }}
          size="xs"
          disabled={disableEditing}
          onComplete={() =>
            description !== rowData.description &&
            updateJournal({ description })
          }
          editing={editing}
        />
      </CustomTd>
      <CustomTd>
        <NumberCellWithPopoverEdit
          value={amount}
          onChange={(e) => setAmount(e || 0)}
          size="xs"
          disabled={disableEditing}
          onBlur={() => amount !== rowData.amount && updateJournal({ amount })}
          precision={2}
          format={formatter.format}
          editing={editing}
        />
      </CustomTd>
      <CustomTd>
        <Text fw={700} color={rowData.total < 0 ? "red" : undefined}>
          {formatter.format(rowData.total)}
        </Text>
      </CustomTd>
      <CustomTd>
        <CategorySelectionWithPopoverEdit
          accountGroupingId={rowData.accountGroupingId || ""}
          value={currentRowData.categoryId}
          size="xs"
          disabled={disableEditing}
          onChange={(e) => {
            console.log("New Category", e);
            e && setCurrentRowData({ ...currentRowData, categoryId: e });
          }}
          onBlur={() =>
            rowData.categoryId !== currentRowData.categoryId &&
            updateJournal(currentRowData)
          }
          searchable
          title={rowData.category?.title || ""}
          editing={editing}
        />
      </CustomTd>
      <CustomTd>
        <TagSelectionWithPopoverEdit
          accountGroupingId={rowData.accountGroupingId || ""}
          value={currentRowData.tagId}
          size="xs"
          disabled={disableEditing}
          onChange={(e) =>
            e && setCurrentRowData({ ...currentRowData, tagId: e })
          }
          onBlur={() =>
            rowData.tagId !== currentRowData.tagId &&
            updateJournal(currentRowData)
          }
          title={rowData.tag?.title || ""}
          editing={editing}
        />
      </CustomTd>
      <CustomTd>
        <BillSelectionWithPopoverEdit
          accountGroupingId={rowData.accountGroupingId || ""}
          value={currentRowData.billId}
          size="xs"
          disabled={disableEditing}
          onChange={(e) =>
            e && setCurrentRowData({ ...currentRowData, billId: e })
          }
          onBlur={() =>
            rowData.billId !== currentRowData.billId &&
            updateJournal(currentRowData)
          }
          title={rowData.bill?.title || ""}
          editing={editing}
        />
      </CustomTd>
      <CustomTd>
        <BudgetSelectionWithPopoverEdit
          accountGroupingId={rowData.accountGroupingId || ""}
          value={currentRowData.budgetId}
          size="xs"
          disabled={disableEditing}
          onChange={(e) =>
            e && setCurrentRowData({ ...currentRowData, budgetId: e })
          }
          onBlur={() =>
            rowData.budgetId !== currentRowData.budgetId &&
            updateJournal(currentRowData)
          }
          title={rowData.budget?.title || ""}
          editing={editing}
        />
      </CustomTd>
    </>
  );
};

export const CustomTd = ({ children }: { children?: ReactNode }) => {
  return (
    <td>
      <Center>{children}</Center>
    </td>
  );
};

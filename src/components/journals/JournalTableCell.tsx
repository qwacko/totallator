import { Center, Group, Stack, Text, TextInput } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import type { CellContext } from "@tanstack/react-table";
import { format } from "date-fns";

import type { JournalsMergedType } from "src/utils/hooks/journals/useJournals";
import { useUpdateJournal } from "src/utils/hooks/journals/useUpdateJournal";
import { useLoggedInUser } from "src/utils/hooks/user/useLoggedInUser";

import { AccountSelection } from "../account/AccountSelection";
import { BillSelection } from "../bill/BillSelection";
import { BudgetSelection } from "../budget/BudgetSelection";
import { CategorySelection } from "../category/CategorySelection";
import { useDisplayCurrency } from "../reusable/DisplayCurrency";
import { InputCurrency } from "../reusable/InputCurrency";
import { CurrencyCell } from "../table/cells/CurrencyCell";
import { DateCell } from "../table/cells/DateCell";
import { TextCell } from "../table/cells/TextCell";
import { TagSelection } from "../tag/TagSelection";
import { JournalCommandButtons } from "./JournalCommandButtons";

export type JournalRowColumns =
  | "description"
  | "createdAt"
  | "updatedAt"
  | "total"
  | "amount"
  | "date"
  | "accountId"
  | "otherJournals"
  | "categoryId"
  | "tagId"
  | "billId"
  | "budgetId"
  | "commands";

export const displayJournalCell = (
  props: CellContext<JournalsMergedType, unknown>
) => {
  const selected = props.row.getIsSelected();

  if (selected) {
    return (
      <JournalTableCell
        id={props.row.id}
        column={props.column.id as JournalRowColumns}
        data={props.row.original}
      />
    );
  }
  return (
    <JournalTableCellView
      column={props.column.id as JournalRowColumns}
      data={props.row.original}
    />
  );
};

export const JournalTableCell = ({
  id,
  column,
  data
}: {
  id: string;
  column: JournalRowColumns;
  data: JournalsMergedType;
}) => {
  const columnUse =
    column === "createdAt" ||
    column === "updatedAt" ||
    column === "total" ||
    column === "commands"
      ? "description"
      : column;
  const { dateFormat } = useLoggedInUser();
  const { form, runMutate } = useUpdateJournal({
    id,
    data,
    keys: [columnUse],
    updateCompleted: false
  });
  const formatter = useDisplayCurrency();
  const { dayjsFormat } = useLoggedInUser();

  const isAdmin = data.userIsAdmin;
  const isComplete = data.complete;

  if (column === "commands") {
    return <JournalCommandButtons data={data} />;
  }
  if (column === "description") {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          runMutate();
        }}
      >
        <TextInput
          {...form.getInputProps("description")}
          onBlur={runMutate}
          type="text"
          disabled={!isAdmin || isComplete}
          size="xs"
        />
      </form>
    );
  }

  if (column === "amount") {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          runMutate();
        }}
      >
        <InputCurrency
          {...form.getInputProps("amount")}
          onBlur={runMutate}
          disabled={!isAdmin || isComplete}
          size="xs"
          styles={{ input: { textAlign: "right", paddingRight: 25 } }}
        />
      </form>
    );
  }
  if (column === "total") {
    return (
      <Text size="xs" align="end">
        {formatter(data[column])}
      </Text>
    );
  }

  if (column === "date") {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          runMutate();
        }}
      >
        <DatePicker
          {...form.getInputProps(column)}
          disabled={!isAdmin || isComplete}
          inputFormat={dayjsFormat}
          onBlur={runMutate}
          size="xs"
          clearable={false}
        />
      </form>
    );
  }

  if (column === "accountId") {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          runMutate();
        }}
      >
        <AccountSelection
          {...form.getInputProps(column)}
          disabled={!isAdmin || isComplete}
          accountGroupingId={data.accountGroupingId}
          onBlur={runMutate}
          size="xs"
          searchable
        />
      </form>
    );
  }

  if (column === "categoryId") {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          runMutate();
        }}
      >
        <CategorySelection
          {...form.getInputProps(column)}
          disabled={!isAdmin || isComplete}
          accountGroupingId={data.accountGroupingId}
          onBlur={runMutate}
          size="xs"
          searchable
          clearable
        />
      </form>
    );
  }

  if (column === "tagId") {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          runMutate();
        }}
      >
        <TagSelection
          {...form.getInputProps(column)}
          disabled={!isAdmin || isComplete}
          accountGroupingId={data.accountGroupingId}
          onBlur={runMutate}
          size="xs"
          searchable
          clearable
        />
      </form>
    );
  }

  if (column === "billId") {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          runMutate();
        }}
      >
        <BillSelection
          {...form.getInputProps(column)}
          disabled={!isAdmin || isComplete}
          accountGroupingId={data.accountGroupingId}
          onBlur={runMutate}
          size="xs"
          searchable
          clearable
        />
      </form>
    );
  }

  if (column === "budgetId") {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          runMutate();
        }}
      >
        <BudgetSelection
          {...form.getInputProps(column)}
          disabled={!isAdmin || isComplete}
          accountGroupingId={data.accountGroupingId}
          onBlur={runMutate}
          size="xs"
          searchable
          clearable
        />
      </form>
    );
  }
  if (column === "otherJournals") {
    if (form.values.otherJournals) {
      const showAmounts = data.otherJournals.length > 2;
      return (
        <Stack>
          {form.values.otherJournals.map((item) => {
            if (item.id === data.id) return <></>;
            return (
              <Group key={item.id} p={0} m={0} spacing={0} grow>
                <AccountSelection
                  key={`${item.id}-Account`}
                  accountGroupingId={data.accountGroupingId}
                  value={item.accountId}
                  onBlur={runMutate}
                  onChange={(e) => {
                    const newOtherJournals = form.values.otherJournals
                      ? form.values.otherJournals.map((journal) =>
                          journal.id === item.id
                            ? { ...journal, accountId: e || undefined }
                            : journal
                        )
                      : undefined;
                    form.setFieldValue("otherJournals", newOtherJournals);
                  }}
                  size="xs"
                  disabled={!isAdmin || isComplete}
                />
                {showAmounts && (
                  <InputCurrency
                    key={`${item.id}-Amount`}
                    value={item.amount}
                    onChange={(e) => {
                      console.log("Updating Amount", e);
                      const newOtherJournals = form.values.otherJournals
                        ? form.values.otherJournals.map((journal) =>
                            journal.id === item.id
                              ? {
                                  ...journal,
                                  amount: e === undefined ? undefined : e
                                }
                              : journal
                          )
                        : undefined;
                      console.log("New Other Journals", newOtherJournals);
                      form.setFieldValue("otherJournals", newOtherJournals);
                    }}
                    onBlur={runMutate}
                    size="xs"
                    disabled={!isAdmin || isComplete}
                  />
                )}
              </Group>
            );
          })}
        </Stack>
      );
    }
    return <></>;
  }

  if (column === "createdAt" || column === "updatedAt") {
    const formattedDate = format(data[column], dateFormat);
    return (
      <Center>
        <Text size="xs">{formattedDate}</Text>
      </Center>
    );
  }
  return <></>;
};

export const JournalTableCellView = ({
  column,
  data
}: {
  column: JournalRowColumns;
  data: JournalsMergedType;
}) => {
  if (column === "commands") {
    return <JournalCommandButtons data={data} />;
  }
  if (column === "description") {
    return <TextCell>{data[column]}</TextCell>;
  }

  if (column === "createdAt" || column === "updatedAt" || column === "date") {
    return <DateCell displayDate={data[column]} />;
  }

  if (column === "tagId") {
    return <TextCell>{data.tag ? data.tag.title : ""}</TextCell>;
  }

  if (column === "categoryId") {
    return <TextCell>{data.category ? data.category.title : ""}</TextCell>;
  }

  if (column === "billId") {
    return <TextCell>{data.bill ? data.bill.title : ""}</TextCell>;
  }

  if (column === "budgetId") {
    return <TextCell>{data.budget ? data.budget.title : ""}</TextCell>;
  }

  if (column === "accountId") {
    return <TextCell>{data.account ? data.account.title : ""}</TextCell>;
  }

  if (column === "otherJournals") {
    const showAmounts = data.otherJournals.length > 2;
    return (
      <Stack>
        {data.otherJournals.map((item) => {
          if (item.id === data.id) return <></>;
          return (
            <Group key={item.id} p={0} m={0} spacing={0} grow>
              <TextCell>{item.account ? item.account.title : ""}</TextCell>
              {showAmounts && <CurrencyCell amount={item.amount} />}
            </Group>
          );
        })}
      </Stack>
    );
  }

  if (column === "amount" || column === "total") {
    return <CurrencyCell amount={data[column]} />;
  }

  return <></>;
};

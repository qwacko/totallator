import { Center, Select, Text, TextInput } from "@mantine/core";
import type { PrismaStatusEnum } from "@prisma/client";
import type { CellContext } from "@tanstack/react-table";
import { format } from "date-fns";
import type { BillsReturnType } from "src/server/trpc/router/_app";
import { useAccountGroupings } from "src/utils/hooks/accountGroupings/useAccountGroupings";
import { useUpdateBill } from "src/utils/hooks/bills/useUpdateBIll";
import { useLoggedInUser } from "src/utils/hooks/user/useLoggedInUser";
import type { updateBillDataValidationType } from "src/utils/validation/bill/updateBillValidation";
import { BillCommandButtons } from "./BillCommandButtons";

export type BillRowColumns =
  | keyof updateBillDataValidationType
  | "createdAt"
  | "updatedAt"
  | "commands";

export const displayBillCell = (
  props: CellContext<BillsReturnType, unknown>
) => {
  return (
    <BillTableCell
      id={props.row.id}
      column={props.column.id as BillRowColumns}
      data={props.row.original}
    />
  );
};

export const BillTableCell = ({
  id,
  column,
  data,
}: {
  id: string;
  column: BillRowColumns;
  data: BillsReturnType;
}) => {
  const columnUse =
    column === "createdAt" || column === "updatedAt" || column === "commands"
      ? "title"
      : column;

  const { form, runMutate, mutate } = useUpdateBill({
    id,
    keys: [columnUse],
    data,
  });
  const { data: accountGroupings } = useAccountGroupings();
  const { dateFormat } = useLoggedInUser();

  const accountGrouping = accountGroupings?.find(
    (item) => item.id === data?.accountGroupingId
  );
  const isAdmin = accountGrouping?.userIsAdmin;

  if (column === "commands") {
    return <BillCommandButtons data={data} />;
  }
  if (column === "title") {
    return (
      <form>
        <TextInput
          {...form.getInputProps("title")}
          type="text"
          onBlur={runMutate}
          disabled={!isAdmin}
          size="xs"
        />
      </form>
    );
  }

  if (column === "status") {
    const value = form.values[column];
    return (
      <form>
        <Select
          value={value}
          data={["Active", "Disabled", "Deleted"]}
          disabled={!isAdmin}
          clearable={false}
          onChange={(newValue) =>
            mutate({ data: { [column]: newValue as PrismaStatusEnum }, id })
          }
          size="xs"
        />
      </form>
    );
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

import { Center, Checkbox, Select, Text, TextInput } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import type { PrismaAccountEnum, PrismaStatusEnum } from "@prisma/client";
import type { CellContext } from "@tanstack/react-table";
import { format } from "date-fns";
import type {
  AccountsReturnType,
  AppRouterOutputs,
} from "src/server/trpc/router/_app";
import { useAccountGroupings } from "src/utils/hooks/accountGroupings/useAccountGroupings";
import { useUpdateAccount } from "src/utils/hooks/accounts/useUpdateAccount";
import { useLoggedInUser } from "src/utils/hooks/user/useLoggedInUser";
import type { updateAccountDataValidationType } from "src/utils/validation/account/updateAccountValidation";

export type AccountRowColumns =
  | keyof updateAccountDataValidationType
  | "createdAt"
  | "updatedAt";

export const displayAccountCell = (
  props: CellContext<AccountsReturnType, unknown>
) => {
  return (
    <AccountTableCell
      id={props.row.id}
      column={props.column.id as AccountRowColumns}
      data={props.row.original}
    />
  );
};

export const AccountTableCell = ({
  id,
  column,
  data,
}: {
  id: string;
  column: AccountRowColumns;
  data: AppRouterOutputs["accounts"]["get"][0];
}) => {
  const columnUse =
    column === "createdAt" || column === "updatedAt" ? "title" : column;

  const { form, runMutate, mutate } = useUpdateAccount({
    id,
    keys: [columnUse],
    data,
  });
  const { data: accountGroupings } = useAccountGroupings();
  const { dayjsFormat, dateFormat } = useLoggedInUser();

  const accountGrouping = accountGroupings?.find(
    (item) => item.id === data?.accountGroupingId
  );
  const isAdmin = accountGrouping?.userIsAdmin;
  const isAssetLiability = ["Asset", "Liability"].includes(data?.type || "");

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
  if (
    column === "accountGroup" ||
    column === "accountGroup2" ||
    column === "accountGroup3" ||
    column === "accountGroupCombined"
  ) {
    if (isAssetLiability) {
      return (
        <form>
          <TextInput
            {...form.getInputProps(column)}
            type="text"
            onBlur={runMutate}
            disabled={!isAdmin}
            size="xs"
          />
        </form>
      );
    }
    return <></>;
  }
  if (column === "isCash" || column === "isNetWorth") {
    const checked = form.values[column];
    return (
      <Center>
        <form>
          <Checkbox
            checked={checked}
            onChange={() => mutate({ data: { [column]: !checked }, id })}
          />
        </form>
      </Center>
    );
  }
  if (column === "type") {
    const value = form.values[column];
    return (
      <form>
        <Select
          value={value}
          data={["Asset", "Liability", "Income", "Expense"]}
          disabled={!isAdmin}
          clearable={false}
          onChange={(newValue) =>
            mutate({ data: { [column]: newValue as PrismaAccountEnum }, id })
          }
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
  if (column === "endDate" || column === "startDate") {
    return (
      <form>
        <DatePicker
          {...form.getInputProps(column)}
          disabled={!isAdmin}
          clearable
          inputFormat={dayjsFormat}
          onBlur={runMutate}
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

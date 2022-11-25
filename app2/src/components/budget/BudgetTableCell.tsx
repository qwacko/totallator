import { Center, Select, Text, TextInput } from "@mantine/core";
import type { PrismaStatusEnum } from "@prisma/client";
import type { CellContext } from "@tanstack/react-table";
import { format } from "date-fns";
import type { BudgetsReturnType } from "src/server/trpc/router/_app";
import { useAccountGroupings } from "src/utils/hooks/accountGroupings/useAccountGroupings";
import { useUpdateBudget } from "src/utils/hooks/budgets/useUpdateBudget";
import { useLoggedInUser } from "src/utils/hooks/user/useLoggedInUser";
import type { updateBudgetDataValidationType } from "src/utils/validation/budget/updateBudgetValidation";

export type BudgetRowColumns =
  | keyof updateBudgetDataValidationType
  | "createdAt"
  | "updatedAt";

export const displayBudgetCell = (
  props: CellContext<BudgetsReturnType, unknown>
) => {
  return (
    <BudgetTableCell
      id={props.row.id}
      column={props.column.id as BudgetRowColumns}
      data={props.row.original}
    />
  );
};

export const BudgetTableCell = ({
  id,
  column,
  data,
}: {
  id: string;
  column: BudgetRowColumns;
  data: BudgetsReturnType;
}) => {
  const columnUse =
    column === "createdAt" || column === "updatedAt" ? "title" : column;

  const { form, runMutate, mutate } = useUpdateBudget({
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

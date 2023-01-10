import { Center, Select, Text, TextInput } from "@mantine/core";
import type { PrismaStatusEnum } from "@prisma/client";
import type { CellContext } from "@tanstack/react-table";
import { format } from "date-fns";
import type { CategoriesReturnType } from "src/server/trpc/router/_app";
import { useAccountGroupings } from "src/utils/hooks/accountGroupings/useAccountGroupings";
import { useUpdateCategory } from "src/utils/hooks/categories/useUpdateCategory";
import { useLoggedInUser } from "src/utils/hooks/user/useLoggedInUser";
import type { updateCategoryDataValidationType } from "src/utils/validation/category/updateCategoryValidation";
import { DateCell } from "../table/cells/DateCell";
import { TextCell } from "../table/cells/TextCell";
import { CategoryCommandButtons } from "./CategoryCommandButtons";

export type CategoryRowColumns =
  | keyof updateCategoryDataValidationType
  | "createdAt"
  | "updatedAt"
  | "commands";

export const displayCategoryCell = (
  props: CellContext<CategoriesReturnType, unknown>
) => {
  const selected = props.row.getIsSelected();

  if (selected) {
    return (
      <CategoryTableCell
        id={props.row.id}
        column={props.column.id as CategoryRowColumns}
        data={props.row.original}
      />
    );
  }
  return (
    <CategoryTableCellView
      column={props.column.id as CategoryRowColumns}
      data={props.row.original}
    />
  );
};

export const CategoryTableCell = ({
  id,
  column,
  data,
}: {
  id: string;
  column: CategoryRowColumns;
  data: CategoriesReturnType;
}) => {
  const columnUse =
    column === "createdAt" || column === "updatedAt" || column === "commands"
      ? "title"
      : column;

  const { form, runMutate, mutate } = useUpdateCategory({
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
    return <CategoryCommandButtons data={data} />;
  }
  if (column === "title" || column === "group" || column === "single") {
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

export const CategoryTableCellView = ({
  column,
  data,
}: {
  column: CategoryRowColumns;
  data: CategoriesReturnType;
}) => {
  if (column === "commands") {
    return <CategoryCommandButtons data={data} />;
  }
  if (
    column === "title" ||
    column === "status" ||
    column === "group" ||
    column === "single"
  ) {
    return <TextCell>{data[column]}</TextCell>;
  }

  if (column === "createdAt" || column === "updatedAt") {
    return <DateCell displayDate={data[column]} />;
  }

  return <></>;
};

import { Center, Select, Text, TextInput } from "@mantine/core";
import type { PrismaStatusEnum } from "@prisma/client";
import type { CellContext } from "@tanstack/react-table";
import { format } from "date-fns";

import type { TagsReturnType } from "src/server/trpc/router/_app";
import { useAccountGroupings } from "src/utils/hooks/accountGroupings/useAccountGroupings";
import { useUpdateTag } from "src/utils/hooks/tags/useUpdateTag";
import { useLoggedInUser } from "src/utils/hooks/user/useLoggedInUser";
import type { updateTagDataValidationType } from "src/utils/validation/tag/updateTagValidation";

import { DateCell } from "../table/cells/DateCell";
import { TextCell } from "../table/cells/TextCell";
import { TagCommandButtons } from "./TagCommandButtons";

export type TagRowColumns =
  | keyof updateTagDataValidationType
  | "createdAt"
  | "updatedAt"
  | "commands";

export const displayTagCell = (props: CellContext<TagsReturnType, unknown>) => {
  const selected = props.row.getIsSelected();

  if (selected) {
    return (
      <TagTableCell
        id={props.row.id}
        column={props.column.id as TagRowColumns}
        data={props.row.original}
      />
    );
  }
  return (
    <TagTableCellView
      column={props.column.id as TagRowColumns}
      data={props.row.original}
    />
  );
};

export const TagTableCell = ({
  id,
  column,
  data
}: {
  id: string;
  column: TagRowColumns;
  data: TagsReturnType;
}) => {
  const columnUse =
    column === "createdAt" || column === "updatedAt" || column === "commands"
      ? "title"
      : column;

  const { form, runMutate, mutate } = useUpdateTag({
    id,
    keys: [columnUse],
    data
  });
  const { data: accountGroupings } = useAccountGroupings();
  const { dateFormat } = useLoggedInUser();

  const accountGrouping = accountGroupings?.find(
    (item) => item.id === data?.accountGroupingId
  );
  const isAdmin = accountGrouping?.userIsAdmin;

  if (column === "commands") {
    return <TagCommandButtons data={data} />;
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

export const TagTableCellView = ({
  column,
  data
}: {
  column: TagRowColumns;
  data: TagsReturnType;
}) => {
  if (column === "commands") {
    return <TagCommandButtons data={data} />;
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

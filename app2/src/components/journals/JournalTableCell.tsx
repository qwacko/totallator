import { Center, Text, TextInput } from "@mantine/core";
import type { CellContext } from "@tanstack/react-table";
import { format } from "date-fns";
import type { JournalsMergedType } from "src/utils/hooks/journals/useJournals";
import { useLoggedInUser } from "src/utils/hooks/user/useLoggedInUser";

export type JournalRowColumns = "description" | "createdAt" | "updatedAt";

export const displayJournalCell = (
  props: CellContext<JournalsMergedType, unknown>
) => {
  return (
    <JournalTableCell
      id={props.row.id}
      column={props.column.id as JournalRowColumns}
      data={props.row.original}
    />
  );
};

export const JournalTableCell = ({
  id,
  column,
  data,
}: {
  id: string;
  column: JournalRowColumns;
  data: JournalsMergedType;
}) => {
  const { dateFormat } = useLoggedInUser();

  const isAdmin = data.userIsAdmin;

  if (column === "description") {
    return (
      <form>
        <TextInput
          value={data.description}
          type="text"
          disabled={!isAdmin}
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

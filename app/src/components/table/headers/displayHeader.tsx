import { type HeaderContext } from "@tanstack/react-table";
import { TableHeader } from "./TableHeader";
import type { FilterTypes } from "./TableFilterInput";
import type { AllReturnTypes } from "src/server/trpc/router/_app";
import type { JournalsMergedType } from "src/utils/hooks/journals/useJournals";

export const displayHeader = <T extends AllReturnTypes | JournalsMergedType>({
  title,
  filterType,
  sortKey,
}: {
  title: string;
  filterType?: FilterTypes;
  sortKey?: string;
}) => {
  const Header = (props: HeaderContext<T, unknown>) => {
    return (
      <TableHeader
        table={props.table}
        header={props.header}
        title={title}
        filterType={filterType}
        sortKey={sortKey || props.header.column.id}
      />
    );
  };
  return Header;
};

import { type HeaderContext } from "@tanstack/react-table";
import { TableHeader } from "./TableHeader";
import type { FilterTypes } from "./TableFilterInput";
import type { AllReturnTypes } from "src/server/trpc/router/_app";

export const displayHeader = <T extends AllReturnTypes>(
  title: string,
  filterType: FilterTypes
) => {
  const Header = (props: HeaderContext<T, unknown>) => {
    return (
      <TableHeader
        table={props.table}
        header={props.header}
        title={title}
        filterType={filterType}
      />
    );
  };
  return Header;
};
import { PrismaAccountEnum } from "@prisma/client";
import { FilterText } from "../table/FilterText";
import { AccountFilterAccountType } from "./AccountFilterAccountType";
import { AccountRowColumns } from "./AccountTableCell";

export const AccountFilter = ({
  targetKey,
  filter,
  setFilter,
}: {
  targetKey: AccountRowColumns;
  filter: unknown;
  setFilter: (data: unknown) => void;
}) => {
  if (targetKey === "type") {
    const filterTyped = filter as PrismaAccountEnum[] | undefined;
    const setFilterTyped = (
      data: PrismaAccountEnum[] | PrismaAccountEnum | null | undefined
    ) => setFilter(data);
    return (
      <AccountFilterAccountType
        filter={filterTyped}
        setFilter={setFilterTyped}
      />
    );
  }
  if (targetKey === "accountGroupCombined" || targetKey === "title") {
    const filterTyped = filter as string | undefined;
    const setFilterTyped = (data: string | undefined) => setFilter(data);
    return <FilterText filter={filterTyped} setFilter={setFilterTyped} />;
  }

  return <></>;
};

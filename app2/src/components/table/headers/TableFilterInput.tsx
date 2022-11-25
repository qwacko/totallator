import type { PrismaAccountEnum, PrismaStatusEnum } from "@prisma/client";
import { FilterText } from "./FilterText";
import { FilterAccountType } from "./FilterAccountType";
import { Center, Checkbox } from "@mantine/core";
import { FilterStatus } from "./FilterStatus";
import { DateRangePicker, type DateRangePickerValue } from "@mantine/dates";

export type FilterTypes =
  | "string"
  | "accountType"
  | "boolean"
  | "status"
  | "date";

export const TableFilterInput = ({
  type,
  filter,
  setFilter,
}: {
  type: FilterTypes;
  filter: unknown;
  setFilter: (data: unknown) => void;
}) => {
  if (type === "accountType") {
    const filterTyped = filter as PrismaAccountEnum[] | undefined;
    const setFilterTyped = (
      data: PrismaAccountEnum[] | PrismaAccountEnum | null | undefined
    ) => setFilter(data);
    return (
      <FilterAccountType filter={filterTyped} setFilter={setFilterTyped} />
    );
  }

  if (type === "status") {
    const filterTyped = filter as PrismaStatusEnum[] | undefined;
    const setFilterTyped = (
      data: PrismaStatusEnum[] | PrismaStatusEnum | null | undefined
    ) => setFilter(data);
    return <FilterStatus filter={filterTyped} setFilter={setFilterTyped} />;
  }
  if (type === "string") {
    const filterTyped = filter as string | undefined;
    const setFilterTyped = (data: string | undefined) => setFilter(data);
    return <FilterText filter={filterTyped} setFilter={setFilterTyped} />;
  }

  if (type === "date") {
    const filterTyped = filter as DateRangePickerValue | undefined;
    const setFilterTyped = (data: DateRangePickerValue | undefined) =>
      setFilter(data);
    return (
      <DateRangePicker
        value={filterTyped}
        onChange={(newValue) => setFilterTyped(newValue)}
        clearable
        dropdownType="modal"
        placeholder="Date Range"
        size="xs"
        inputFormat="YYYY-MM-DD"
      />
    );
  }
  if (type === "boolean") {
    const filterTyped = filter as boolean | undefined;
    const setFilterTyped = (data: boolean | undefined) => setFilter(data);
    const isChecked = filterTyped === true;
    const isIndeterminate = filterTyped === undefined;
    return (
      <Center>
        <Checkbox
          checked={isChecked}
          indeterminate={isIndeterminate}
          onChange={() => {
            if (isChecked) {
              setFilterTyped(false);
            } else if (isIndeterminate) {
              setFilterTyped(true);
            } else {
              setFilterTyped(undefined);
            }
          }}
        />
      </Center>
    );
  }

  return <></>;
};

import type { PrismaAccountEnum, PrismaStatusEnum } from "@prisma/client";
import { FilterText } from "./FilterText";
import { FilterAccountType } from "./FilterAccountType";
import { Center, Checkbox } from "@mantine/core";
import { FilterStatus } from "./FilterStatus";
import { DateRangePicker, type DateRangePickerValue } from "@mantine/dates";
import { useEffect, useState } from "react";
import { setDate } from "date-fns";
import { statusFilter } from "../filters/statusFilter";

const DateFilterHandler = ({
  filter,
  setFilter,
}: {
  filter: storedDateRangeType;
  setFilter: (data: storedDateRangeType) => void;
}) => {
  const [dateFilter, setDateFilter] = useState<
    DateRangePickerValue | undefined
  >(filter ? [filter.gte || null, filter.lte || null] : undefined);

  useEffect(
    () =>
      setDateFilter(
        filter ? [filter.gte || null, filter.lte || null] : undefined
      ),
    [filter, setDateFilter]
  );

  return (
    <DateRangePicker
      value={dateFilter}
      onChange={(newValue) => setDateFilter(newValue)}
      onBlur={() =>
        setFilter(
          dateFilter
            ? {
                gte: dateFilter[0] || undefined,
                lte: dateFilter[1] || undefined,
              }
            : undefined
        )
      }
      clearable
      dropdownType="modal"
      placeholder="Date Range"
      size="xs"
      inputFormat="YYYY-MM-DD"
    />
  );
};

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
    const filterTyped = filter as storedDateRangeType | undefined;
    const setFilterTyped = (data: storedDateRangeType | undefined) =>
      setFilter(data);
    return (
      <DateFilterHandler filter={filterTyped} setFilter={setFilterTyped} />
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

type storedDateRangeType = { gte?: Date; lte?: Date } | undefined;

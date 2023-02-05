import { z } from "zod";

export const dateRanges = [
  "all",
  "thisCalendarYear",
  "lastCalendarYear",
  "thisQuarter",
  "lastQuarter",
  "thisFY",
  "lastFY",
  "thisMonth",
  "lastMonth",
  "thisYear",
  "lastYear"
] as const;

export type dateRangeType = (typeof dateRanges)[number];

export const dateRangeFilter = z.enum(dateRanges).optional();

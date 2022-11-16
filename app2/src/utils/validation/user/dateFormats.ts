import { format } from "date-fns";
import { z } from "zod";

export type DBDateFormatTypes =
  | "DashDDMMYYYY"
  | "DashMMDDYYYY"
  | "SlashDDMMYY"
  | "SlashMMDDYY"
  | "TextWithDOW"
  | "TextShort"
  | "TextShortest"
  | "DashYYYYMMDD"
  | "YYYYMMDD";

type dateFormatType = { dbValue: DBDateFormatTypes; dateFnFormat: string };

export const dateFormats: dateFormatType[] = [
  { dbValue: "DashDDMMYYYY", dateFnFormat: "dd-MM-yyyy" },
  { dbValue: "DashMMDDYYYY", dateFnFormat: "MM-dd-yyyy" },
  { dbValue: "SlashDDMMYY", dateFnFormat: "dd/MM/yyyy" },
  { dbValue: "SlashMMDDYY", dateFnFormat: "MM/dd/yyyy" },
  { dbValue: "TextWithDOW", dateFnFormat: "EEE do LLL ''yy" },
  { dbValue: "TextShort", dateFnFormat: "do LLL ''yy" },
  { dbValue: "TextShortest", dateFnFormat: "dd LLL yy" },
  { dbValue: "DashYYYYMMDD", dateFnFormat: "yyyy-MM-dd" },
  { dbValue: "YYYYMMDD", dateFnFormat: "yyyyMMdd" },
];

export const DBDateList = [
  "DashDDMMYYYY",
  "DashMMDDYYYY",
  "SlashDDMMYY",
  "SlashMMDDYY",
  "TextWithDOW",
  "TextShort",
  "TextShortest",
  "DashYYYYMMDD",
  "YYYYMMDD",
] as const;

export const dbDateFormatValidation = z.enum(DBDateList);

export const dateFormatter = (input: DBDateFormatTypes) => {
  return (
    dateFormats.find((item) => item.dbValue === input)?.dateFnFormat ||
    "yyyyMMdd"
  );
};

export const dateFormatOptions: { value: DBDateFormatTypes; label: string }[] =
  dateFormats.map((item) => ({
    value: item.dbValue,
    label: format(new Date(2015, 2, 25), dateFormatter(item.dbValue)),
  }));

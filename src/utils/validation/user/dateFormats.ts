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

type dateFormatType = {
  dbValue: DBDateFormatTypes;
  dateFnFormat: string;
  dayjsFormat: string;
};

export const dateFormats: dateFormatType[] = [
  {
    dbValue: "DashDDMMYYYY",
    dateFnFormat: "dd-MM-yyyy",
    dayjsFormat: "DD-MM-YYYY"
  },
  {
    dbValue: "DashMMDDYYYY",
    dateFnFormat: "MM-dd-yyyy",
    dayjsFormat: "MM-DD-YYYY"
  },
  {
    dbValue: "SlashDDMMYY",
    dateFnFormat: "dd/MM/yyyy",
    dayjsFormat: "DD/MM/YYYY"
  },
  {
    dbValue: "SlashMMDDYY",
    dateFnFormat: "MM/dd/yyyy",
    dayjsFormat: "MM/DD/YYYY"
  },
  {
    dbValue: "TextWithDOW",
    dateFnFormat: "EEE do LLL ''yy",
    dayjsFormat: "ddd D MMM 'YY"
  },
  {
    dbValue: "TextShort",
    dateFnFormat: "do LLL ''yy",
    dayjsFormat: "DD-MM-YYYY"
  },
  {
    dbValue: "TextShortest",
    dateFnFormat: "dd LLL yy",
    dayjsFormat: "DD-MM-YYYY"
  },
  {
    dbValue: "DashYYYYMMDD",
    dateFnFormat: "yyyy-MM-dd",
    dayjsFormat: "DD-MM-YYYY"
  },
  { dbValue: "YYYYMMDD", dateFnFormat: "yyyyMMdd", dayjsFormat: "YYYYMMDD" }
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
  "YYYYMMDD"
] as const;

export const dbDateFormatValidation = z.enum(DBDateList);

export const dayjsFormatter = (input: DBDateFormatTypes) => {
  return (
    dateFormats.find((item) => item.dbValue === input)?.dayjsFormat ||
    "YYYYMMDD"
  );
};

export const dateFormatter = (input: DBDateFormatTypes) => {
  return (
    dateFormats.find((item) => item.dbValue === input)?.dateFnFormat ||
    "yyyyMMdd"
  );
};

export const dateFormatOptions: { value: DBDateFormatTypes; label: string }[] =
  dateFormats.map((item) => ({
    value: item.dbValue,
    label: format(new Date(2015, 2, 25), dateFormatter(item.dbValue))
  }));

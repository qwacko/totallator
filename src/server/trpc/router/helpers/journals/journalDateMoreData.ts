import { format } from "date-fns";

type DateObjectType = { date?: Date | undefined | null };
type DateAdditionalInfo = {
  year: string;
  yearWeek: string;
  yearMonth: string;
  yearQuarter: string;
  yearMonthDay: string;
};

export const additionalDateInfo = (input: Date): DateAdditionalInfo => {
  const year = format(input, "YYYY");
  const yearWeek = format(input, "YYYY-ll");
  const yearMonth = format(input, "YYYY-MM");
  const yearQuarter = format(input, "YYYY-QQ");
  const yearMonthDay = format(input, "YYYY-MM-dd");

  return { year, yearWeek, yearMonth, yearQuarter, yearMonthDay };
};

export const journalDateMoreData = <T extends DateObjectType>(
  input: T
): T | (T & DateAdditionalInfo) => {
  if (input.date) {
    return { ...input, ...additionalDateInfo(input.date) };
  }
  return input;
};

export const journalDateArrayMoreData = <T extends DateObjectType>(
  input: T[]
) => {
  return input.map((item) => journalDateMoreData(item));
};

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
  const year = format(input, "yyyy");
  const yearWeek = format(input, "yyyy-II");
  const yearMonth = format(input, "yyyy-MM");
  const yearQuarter = format(input, "yyyy-QQ");
  const yearMonthDay = format(input, "yyyy-MM-dd");

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

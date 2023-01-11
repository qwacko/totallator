import { isEqual, pick } from "lodash";

type linkedProperties = {
  date: Date;
  description: string;
  linked: boolean;
  accountGroupingId: string;
  billId?: string | undefined | null;
  budgetId?: string | undefined | null;
  categoryId?: string | undefined | null;
  tagId?: string | undefined | null;
  reconciled: boolean;
  dataChecked: boolean;
  complete: boolean;
};

export const extractLinked = <T extends linkedProperties>(input: T) => {
  return pick(input, [
    "date",
    "description",
    "linked",
    "accountGroupingId",
    "billId",
    "budgetId",
    "categoryId",
    "tagId",
    "reconciled",
    "dataChecked",
    "complete"
  ]);
};

export const compareLinked = <
  T extends linkedProperties,
  U extends linkedProperties
>(
  item1: T,
  item2: U
) => {
  return isEqual(extractLinked(item1), extractLinked(item2));
};

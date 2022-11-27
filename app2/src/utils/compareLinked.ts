import { isEqual } from "lodash";

type linkedProperties = {
  date: Date;
  description: string;
  linked: boolean;
  accountGroupingId: string;
  billId?: string | undefined;
  budgetId?: string | undefined;
  categoryId?: string | undefined;
  tagId?: string | undefined;
  reconciled: boolean;
  dataChecked: boolean;
  complete: boolean;
};

export const compareLinked = (
  item1: linkedProperties,
  item2: linkedProperties
) => {
  return isEqual(item1, item2);
};

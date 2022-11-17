import { trpc } from "src/utils/trpc";

export type billsFilter = {
  includeDisabled?: boolean;
  includeDeleted?: boolean;
  excludeActive?: boolean;
  titleIncludes?: string;
};

export const useBills = ({ filter = {} }: { filter?: billsFilter } = {}) => {
  const { data: allBills, isLoading } = trpc.bills.get.useQuery();

  const filteredBills = !allBills
    ? []
    : allBills.filter((bill) => {
        let matched = true;

        if (!filter.includeDeleted && bill.deleted) matched = false;
        if (!filter.includeDisabled && bill.disabled) matched = false;
        if (filter.excludeActive && bill.active) matched = false;
        if (filter.titleIncludes) {
          if (
            bill.title
              .toLocaleLowerCase()
              .includes(filter.titleIncludes.toLocaleLowerCase())
          ) {
            matched = false;
          }
        }

        return matched;
      });

  const bills = filteredBills;

  return { allBills, isLoading, bills };
};

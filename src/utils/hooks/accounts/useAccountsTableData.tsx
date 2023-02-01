import deepEquals from "fast-deep-equal";
import { atom } from "jotai";
import { selectAtom } from "jotai/utils";
import { useMemo } from "react";

import { paginationAtomGenerator } from "src/components/tableAtom/AtomPagination";
import { type RouterOutputs } from "src/utils/trpc";
import type {
  AccountFilterValidation,
  AccountSortValidation,
  GetAccountInputValidationType
} from "src/utils/validation/account/getAccountInputValidation";

import { idSelectionAtom } from "../journals/idSelectionAtom";
import { tableFilterAtom } from "../table/useTableFilterAtom";
import { tableSortAtom } from "../table/useTableSortAtom";
import { accountFiltersToPrismaFilters } from "./accountFiltersToPrismaFilters";
import { accountSortingStateToPrismaSort } from "./accountSortingStateToPrismaSort";

export type AccountSortKeys = AccountSortValidation[0]["key"];

export type AccountFilterKeys = keyof AccountFilterValidation;

export const useAccountsTableData = () => {
  return useMemo(() => {
    const pagination = paginationAtomGenerator();
    const filter = tableFilterAtom<AccountFilterKeys>();
    const sort = tableSortAtom<AccountSortKeys>();
    const data = atom<RouterOutputs["accounts"]["get"]["data"]>([]);
    const selection = idSelectionAtom();

    const displayIds = selectAtom(
      data,
      (dataProcess) => dataProcess.map((item) => item.id),
      deepEquals
    );

    const configForTRPC = atom((get) => {
      const sortingToUse = accountSortingStateToPrismaSort(get(sort) || []);
      const filtersToUse = accountFiltersToPrismaFilters({
        filters: get(filter) || []
      });

      const paginationData = get(pagination);

      const returnData: GetAccountInputValidationType = {
        sort: sortingToUse,
        pagination: {
          pageNo: paginationData.pageIndex,
          pageSize: paginationData.pageSize
        },
        filters: filtersToUse
      };
      return returnData;
    });

    const configForTRPCNext = atom((get) => {
      const config = get(configForTRPC);

      const newConfig = {
        ...config,
        pagination: config.pagination
          ? {
              pageNo: config.pagination.pageNo + 1,
              pageSize: config.pagination.pageSize
            }
          : undefined
      };

      return newConfig;
    });

    const configForTRPCPrev = atom((get) => {
      const config = get(configForTRPC);

      const newConfig = {
        ...config,
        pagination: config.pagination
          ? {
              pageNo: Math.max(config.pagination.pageNo - 1, 0),
              pageSize: config.pagination.pageSize
            }
          : undefined
      };

      return newConfig;
    });

    return {
      pagination,
      filter,
      sort,
      displayIds,
      data,
      configForTRPC,
      configForTRPCNext,
      configForTRPCPrev,
      ...selection
    };
  }, []);
};

export type AccountsTableDataType = ReturnType<typeof useAccountsTableData>;

import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";

import type { BillsTableDataType } from "src/utils/hooks/bills/useBillsTableData";
import { trpc } from "src/utils/trpc";

export const BillLoadData = ({ config }: { config: BillsTableDataType }) => {
  const setBillData = useSetAtom(config.data);
  const setPagination = useSetAtom(config.pagination);

  //Load The Data
  const queryConfig = useAtomValue(config.configForTRPC);
  const billData = trpc.bills.get.useQuery(queryConfig);
  //Logic to pre-load the next and previous pages of data
  const queryConfigNext = useAtomValue(config.configForTRPCNext);
  const queryConfigPrev = useAtomValue(config.configForTRPCPrev);
  trpc.bills.get.useQuery(queryConfigNext);
  trpc.bills.get.useQuery(queryConfigPrev);

  useEffect(() => {
    if (billData.data) {
      setBillData(billData.data.data);
      setPagination((current) => ({
        ...current,
        rowCount: billData.data.count
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [billData.data, setBillData, setPagination]);

  return <></>;
};

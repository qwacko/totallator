import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";

import type { AccountsTableDataType } from "src/utils/hooks/accounts/useAccountsTableData";
import { trpc } from "src/utils/trpc";

export const AccountLoadData = ({
  config
}: {
  config: AccountsTableDataType;
}) => {
  const setAccountData = useSetAtom(config.data);
  const setPagination = useSetAtom(config.pagination);

  //Load The Data
  const queryConfig = useAtomValue(config.configForTRPC);
  const accountData = trpc.accounts.get.useQuery(queryConfig);
  //Logic to pre-load the next and previous pages of data
  const queryConfigNext = useAtomValue(config.configForTRPCNext);
  const queryConfigPrev = useAtomValue(config.configForTRPCPrev);
  trpc.accounts.get.useQuery(queryConfigNext);
  trpc.accounts.get.useQuery(queryConfigPrev);

  useEffect(() => {
    if (accountData.data) {
      setAccountData(accountData.data.data);
      setPagination((current) => ({
        ...current,
        rowCount: accountData.data.count
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountData.data, setAccountData, setPagination]);

  return <></>;
};

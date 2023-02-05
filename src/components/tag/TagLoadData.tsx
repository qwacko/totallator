import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";

import type { TagsTableDataType } from "src/utils/hooks/tags/useTagsTableData";
import { trpc } from "src/utils/trpc";

export const TagLoadData = ({ config }: { config: TagsTableDataType }) => {
  const setTagData = useSetAtom(config.data);
  const setPagination = useSetAtom(config.pagination);

  //Load The Data
  const queryConfig = useAtomValue(config.configForTRPC);
  const tagData = trpc.tags.get.useQuery(queryConfig);
  //Logic to pre-load the next and previous pages of data
  const queryConfigNext = useAtomValue(config.configForTRPCNext);
  const queryConfigPrev = useAtomValue(config.configForTRPCPrev);
  trpc.tags.get.useQuery(queryConfigNext);
  trpc.tags.get.useQuery(queryConfigPrev);

  useEffect(() => {
    if (tagData.data) {
      setTagData(tagData.data.data);
      setPagination((current) => ({
        ...current,
        rowCount: tagData.data.count
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tagData.data, setTagData, setPagination]);

  return <></>;
};

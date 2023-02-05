import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";

import type { CategoriesTableDataType } from "src/utils/hooks/categories/useCategoriesTableData";
import { trpc } from "src/utils/trpc";

export const CategoryLoadData = ({
  config
}: {
  config: CategoriesTableDataType;
}) => {
  const setCategoryData = useSetAtom(config.data);
  const setPagination = useSetAtom(config.pagination);

  //Load The Data
  const queryConfig = useAtomValue(config.configForTRPC);
  const categoryData = trpc.categories.get.useQuery(queryConfig);
  //Logic to pre-load the next and previous pages of data
  const queryConfigNext = useAtomValue(config.configForTRPCNext);
  const queryConfigPrev = useAtomValue(config.configForTRPCPrev);
  trpc.categories.get.useQuery(queryConfigNext);
  trpc.categories.get.useQuery(queryConfigPrev);

  useEffect(() => {
    if (categoryData.data) {
      setCategoryData(categoryData.data.data);
      setPagination((current) => ({
        ...current,
        rowCount: categoryData.data.count
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryData.data, setCategoryData, setPagination]);

  return <></>;
};

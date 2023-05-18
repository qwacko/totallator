import { Group, Pagination, Select } from "@mantine/core";
import { type PrimitiveAtom, atom, useAtom } from "jotai";

export type TablePaginationType = {
  pageIndex: number;
  pageSize: number;
  rowCount: number;
};

export const paginationAtomGenerator = (defaultSize = 10) =>
  atom<TablePaginationType>({
    pageIndex: 0,
    pageSize: defaultSize,
    rowCount: 0
  });

export const AtomPagination = ({
  paginationAtom
}: {
  paginationAtom: PrimitiveAtom<TablePaginationType>;
}) => {
  const [pagination, setPagination] = useAtom(paginationAtom);

  return (
    <Group>
      <Pagination
        value={pagination.pageIndex + 1}
        total={Math.ceil((pagination.rowCount || 0) / pagination.pageSize)}
        onChange={(newValue) =>
          setPagination({
            ...pagination,
            pageIndex: newValue - 1
          })
        }
      />
      <Select
        value={pagination.pageSize.toString()}
        data={[
          { label: "1 Row", value: "1" },
          { label: "10 Rows", value: "10" },
          { label: "20 Rows", value: "20" },
          { label: "50 Rows", value: "50" },
          { label: "100 Rows", value: "100" },
          { label: "500 Rows", value: "500" }
        ]}
        onChange={(newValue) => {
          console.log("Updating Pagination", newValue);
          setPagination({
            ...pagination,
            pageSize: Number(newValue)
          });
        }}
      />
    </Group>
  );
};

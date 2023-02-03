import { Checkbox } from "@mantine/core";
import deepEquals from "fast-deep-equal";
import { useAtom } from "jotai";
import { selectAtom } from "jotai/utils";
import { useEffect, useMemo, useState } from "react";

import { CustomTd } from "src/components/tableAtom/CustomTd";
import { TextCellWithPopoverEdit } from "src/components/tableAtom/cells/TextCellWithPopoverEdit";
import type { CategoriesTableDataType } from "src/utils/hooks/categories/useCategoriesTableData";
import { useUpdateCategory } from "src/utils/hooks/categories/useUpdateCategory";
import type { updateCategoryDataValidationType } from "src/utils/validation/category/updateCategoryValidation";

import { CategoryCommandButtons } from "../CategoryCommandButtons";

export const CategoryTableRowDisplay = ({
  rowId,
  config
}: {
  rowId: string;
  config: CategoriesTableDataType;
}) => {
  const rowDataAtom = useMemo(
    () =>
      selectAtom(
        config.data,
        (data) => data.find((item) => item.id === rowId),
        deepEquals
      ),
    [rowId, config.data]
  );

  const [rowData] = useAtom(rowDataAtom);
  const [group, setGroup] = useState("");
  const [single, setSingle] = useState("");

  const resetRowData = () => {
    if (rowData) {
      setGroup(rowData.group);
      setSingle(rowData.single);
    }
  };

  useEffect(() => {
    resetRowData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowData]);

  const selectedAtom = useMemo(
    () => config.selectionAtomById(rowId),
    [rowId, config]
  );
  const [selected, toggleSelected] = useAtom(selectedAtom);

  const { mutate } = useUpdateCategory();

  const updateCategory = (newData: updateCategoryDataValidationType) => {
    mutate({
      id: rowId,
      data: newData
    });
  };

  const disableEditing = rowData ? !rowData.userIsAdmin : true;

  if (!rowData) return <></>;

  return (
    <>
      <CustomTd>
        <Checkbox
          checked={selected}
          onChange={() => toggleSelected()}
          transitionDuration={0}
        />
      </CustomTd>
      <CustomTd>
        <CategoryCommandButtons data={rowData} />
      </CustomTd>
      <CustomTd>
        <TextCellWithPopoverEdit
          value={group}
          onChange={(e) => {
            setGroup(e.target.value);
          }}
          size="xs"
          disabled={disableEditing}
          editing={selected}
          onComplete={() =>
            group !== rowData.group && updateCategory({ group })
          }
        />
      </CustomTd>
      <CustomTd>
        <TextCellWithPopoverEdit
          value={single}
          onChange={(e) => {
            setSingle(e.target.value);
          }}
          size="xs"
          disabled={disableEditing}
          editing={selected}
          onComplete={() =>
            single !== rowData.single && updateCategory({ single })
          }
        />
      </CustomTd>
    </>
  );
};

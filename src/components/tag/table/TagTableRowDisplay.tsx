import { Checkbox } from "@mantine/core";
import deepEquals from "fast-deep-equal";
import { useAtom } from "jotai";
import { selectAtom } from "jotai/utils";
import { useEffect, useMemo, useState } from "react";

import { CustomTd } from "src/components/tableAtom/CustomTd";
import { TextCellWithPopoverEdit } from "src/components/tableAtom/cells/TextCellWithPopoverEdit";
import type { TagsTableDataType } from "src/utils/hooks/tags/useTagsTableData";
import { useUpdateTag } from "src/utils/hooks/tags/useUpdateTag";
import type { updateTagDataValidationType } from "src/utils/validation/tag/updateTagValidation";

import { TagCommandButtons } from "../TagCommandButtons";

export const TagTableRowDisplay = ({
  rowId,
  config
}: {
  rowId: string;
  config: TagsTableDataType;
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

  const { mutate } = useUpdateTag();

  const updateTag = (newData: updateTagDataValidationType) => {
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
        <TagCommandButtons data={rowData} />
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
          onComplete={() => group !== rowData.group && updateTag({ group })}
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
          onComplete={() => single !== rowData.single && updateTag({ group })}
        />
      </CustomTd>
    </>
  );
};

import { Checkbox } from "@mantine/core";
import deepEquals from "fast-deep-equal";
import { useAtom } from "jotai";
import { selectAtom } from "jotai/utils";
import { useEffect, useMemo, useState } from "react";

import { CustomTd } from "src/components/tableAtom/CustomTd";
import { TextCellWithPopoverEdit } from "src/components/tableAtom/cells/TextCellWithPopoverEdit";
import type { BudgetsTableDataType } from "src/utils/hooks/budgets/useBudgetsTableData";
import { useUpdateBudget } from "src/utils/hooks/budgets/useUpdateBudget";
import type { updateBudgetDataValidationType } from "src/utils/validation/budget/updateBudgetValidation";

import { BudgetCommandButtons } from "../BudgetCommandButtons";

export const BudgetTableRowDisplay = ({
  rowId,
  config
}: {
  rowId: string;
  config: BudgetsTableDataType;
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
  const [title, setTitle] = useState("");

  const resetRowData = () => {
    if (rowData) {
      setTitle(rowData.title);
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

  const { mutate } = useUpdateBudget();

  const updateBudget = (newData: updateBudgetDataValidationType) => {
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
        <BudgetCommandButtons data={rowData} />
      </CustomTd>
      <CustomTd>
        <TextCellWithPopoverEdit
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          size="xs"
          disabled={disableEditing}
          editing={selected}
          onComplete={() => title !== rowData.title && updateBudget({ title })}
        />
      </CustomTd>
    </>
  );
};

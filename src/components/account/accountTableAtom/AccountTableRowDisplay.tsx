import { Checkbox } from "@mantine/core";
import deepEquals from "fast-deep-equal";
import { useAtom } from "jotai";
import { selectAtom } from "jotai/utils";
import { useEffect, useMemo, useState } from "react";

import { CustomTd } from "src/components/tableAtom/CustomTd";
import { TextCellWithPopoverEdit } from "src/components/tableAtom/cells/TextCellWithPopoverEdit";
import type { AccountsTableDataType } from "src/utils/hooks/accounts/useAccountsTableData";
import { useUpdateAccount } from "src/utils/hooks/accounts/useUpdateAccount";
import type { updateAccountDataValidationType } from "src/utils/validation/account/updateAccountValidation";

// import { useLoggedInUser } from "src/utils/hooks/user/useLoggedInUser";
// import { currencyFormatter } from "src/utils/validation/user/currencyFormats";

export const AccountTableRowDisplay = ({
  rowId,
  config
}: {
  rowId: string;
  config: AccountsTableDataType;
}) => {
  //   const { dateFormat, dayjsFormat, user } = useLoggedInUser();
  //   const formatter = currencyFormatter(user ? user.currencyFormat : "USD");

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

  //   const editingAtom = useMemo(
  //     () => config.editingByIdAtom(rowId),
  //     [rowId, config]
  //   );
  //   const [editing, toggleEditing] = useAtom(editingAtom);

  const selectedAtom = useMemo(
    () => config.selectionAtomById(rowId),
    [rowId, config]
  );
  const [selected, toggleSelected] = useAtom(selectedAtom);

  const { mutate } = useUpdateAccount();

  const updateAccount = (newData: updateAccountDataValidationType) => {
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
        <TextCellWithPopoverEdit
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          size="xs"
          disabled={disableEditing}
          editing={selected}
          onComplete={() => title !== rowData.title && updateAccount({ title })}
        />
      </CustomTd>
    </>
  );
};

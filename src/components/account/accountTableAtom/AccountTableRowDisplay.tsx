import deepEquals from "fast-deep-equal";
import { useAtom } from "jotai";
import { selectAtom } from "jotai/utils";
import { useEffect, useMemo, useState } from "react";

import { CustomTd } from "src/components/tableAtom/CustomTd";
import { TextCellWithPopoverEdit } from "src/components/tableAtom/cells/TextCellWithPopoverEdit";
import type { AccountsTableDataType } from "src/utils/hooks/accounts/useAccountsAtom";

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

  //   const selectedAtom = useMemo(
  //     () => config.selectedByIdAtom(rowId),
  //     [rowId, config]
  //   );
  //   const [selected, toggleSelected] = useAtom(selectedAtom);

  //   const { mutate } = useUpdateJournals({
  //     onError: () => resetRowData()
  //   });

  //   const updateJournal = (newData: UpdateJournalDataInputType) => {
  //     mutate({
  //       filters: [{ id: { in: [rowId] } }],
  //       maxUpdated: 2,
  //       data: newData
  //     });
  //   };

  const disableEditing = rowData ? !rowData.userIsAdmin : true;

  if (!rowData) return <></>;

  return (
    <>
      <CustomTd>
        <TextCellWithPopoverEdit
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          size="xs"
          disabled={disableEditing}
          editing={false}
        />
      </CustomTd>
    </>
  );
};

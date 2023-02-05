import { Checkbox } from "@mantine/core";
import deepEquals from "fast-deep-equal";
import { useAtom } from "jotai";
import { selectAtom } from "jotai/utils";
import { useEffect, useMemo, useState } from "react";

import { CustomTd } from "src/components/tableAtom/CustomTd";
import { AccountTypeSelectionWithPopoverEdit } from "src/components/tableAtom/cells/AccountTypeSelectionWithPopoverEdit";
import { CheckboxCellWithPopoverEdit } from "src/components/tableAtom/cells/CheckboxCellWithPopoverEdit";
import { DatePickerWithPopoverEditNew } from "src/components/tableAtom/cells/DatePickerWithPopoverEdit";
import { TextCellWithPopoverEdit } from "src/components/tableAtom/cells/TextCellWithPopoverEdit";
import type { AccountsTableDataType } from "src/utils/hooks/accounts/useAccountsTableData";
import { useUpdateAccount } from "src/utils/hooks/accounts/useUpdateAccount";
import { useLoggedInUser } from "src/utils/hooks/user/useLoggedInUser";
import type { PrismaAccountTypeEnumType } from "src/utils/validation/PrismaAccountTypeEnumValidation";
import type { updateAccountDataValidationType } from "src/utils/validation/account/updateAccountValidation";

import { AccountCommandButtons } from "../AccountCommandButtons";
import { AccountStats } from "../AccountStats";

export const AccountTableRowDisplay = ({
  rowId,
  config
}: {
  rowId: string;
  config: AccountsTableDataType;
}) => {
  const { dateFormat } = useLoggedInUser();
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
  const [accountGroupCombined, setAccountGroupCombined] = useState<
    string | null
  >("");
  const [isCash, setIsCash] = useState(false);
  const [isNetWorth, setIsNetWorth] = useState(false);
  const [accountType, setAccountType] = useState<
    PrismaAccountTypeEnumType | undefined
  >();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const resetRowData = () => {
    if (rowData) {
      setTitle(rowData.title);
      setIsCash(rowData.isCash);
      setIsNetWorth(rowData.isNetWorth);
      setAccountType(rowData.type);
      setAccountGroupCombined(rowData.accountGroupCombined);
      setStartDate(rowData.startDate);
      setEndDate(rowData.endDate);
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

  const { mutate } = useUpdateAccount();

  const updateAccount = (newData: updateAccountDataValidationType) => {
    mutate({
      id: rowId,
      data: newData
    });
  };

  const disableEditing = rowData ? !rowData.userIsAdmin : true;
  const incExp = accountType === "Income" || accountType === "Expense";
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
        <AccountCommandButtons data={rowData} />
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
      <CustomTd>
        <CheckboxCellWithPopoverEdit
          checked={isCash}
          onClick={() => {
            setIsCash(!isCash);
            updateAccount({ isCash: !isCash });
          }}
          disabled={disableEditing}
          editing={selected}
        />
      </CustomTd>
      <CustomTd>
        <CheckboxCellWithPopoverEdit
          checked={isNetWorth}
          onClick={() => {
            setIsNetWorth(!isNetWorth);
            updateAccount({ isNetWorth: !isNetWorth });
          }}
          disabled={disableEditing}
          editing={selected}
        />
      </CustomTd>
      <CustomTd>
        <AccountTypeSelectionWithPopoverEdit
          value={accountType}
          editing={selected}
          size="xs"
          disabled={disableEditing}
          onChange={(e) => {
            if (e) {
              const newType = e as PrismaAccountTypeEnumType;
              setAccountType(newType);
            }
          }}
          onBlur={() =>
            rowData.type !== accountType && updateAccount({ type: accountType })
          }
        />
      </CustomTd>
      <CustomTd>
        <TextCellWithPopoverEdit
          value={incExp ? "" : accountGroupCombined || ""}
          onChange={(e) => {
            setAccountGroupCombined(e.target.value);
          }}
          size="xs"
          disabled={disableEditing || incExp}
          editing={selected && !incExp}
          onComplete={() =>
            !incExp &&
            accountGroupCombined &&
            accountGroupCombined !== rowData.accountGroupCombined &&
            updateAccount({ accountGroupCombined })
          }
        />
      </CustomTd>
      <CustomTd>
        <DatePickerWithPopoverEditNew
          value={startDate}
          clearable={true}
          disabled={disableEditing || incExp}
          onChange={(e) => {
            setStartDate(e);
            updateAccount({ startDate: e });
          }}
          dateFnsFormat={dateFormat || ""}
        />
      </CustomTd>
      <CustomTd>
        <DatePickerWithPopoverEditNew
          value={endDate}
          clearable={true}
          disabled={disableEditing || incExp}
          onChange={(e) => {
            setEndDate(e);
            updateAccount({ endDate: e });
          }}
          dateFnsFormat={dateFormat || ""}
        />
      </CustomTd>
      <CustomTd>
        <AccountStats id={rowData.id} />
      </CustomTd>
    </>
  );
};

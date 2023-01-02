import { Button } from "@mantine/core";
import { IconDatabaseExport } from "@tabler/icons";
import { trpc } from "src/utils/trpc";
4;
import * as XLSX from "xlsx";

export const AccountGroupingExport = ({
  accountGroupingId,
}: {
  accountGroupingId: string;
}) => {
  const context = trpc.useContext();
  const getData = async () => {
    const accountGroupingData = await context.accountGroupings.export.fetch({
      accountGroupingId,
    });

    const worksheets = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      worksheets,
      XLSX.utils.json_to_sheet([accountGroupingData.accountGrouping]),
      "Account Grouping"
    );
    XLSX.utils.book_append_sheet(
      worksheets,
      XLSX.utils.json_to_sheet(accountGroupingData.journalEntries || []),
      "Journals"
    );
    XLSX.utils.book_append_sheet(
      worksheets,
      XLSX.utils.json_to_sheet(accountGroupingData.accounts || []),
      "Accounts"
    );

    XLSX.utils.book_append_sheet(
      worksheets,
      XLSX.utils.json_to_sheet(accountGroupingData.bills || []),
      "Bills"
    );

    XLSX.utils.book_append_sheet(
      worksheets,
      XLSX.utils.json_to_sheet(accountGroupingData.budgets || []),
      "Budgets"
    );

    XLSX.utils.book_append_sheet(
      worksheets,
      XLSX.utils.json_to_sheet(accountGroupingData.categories || []),
      "Categories"
    );

    XLSX.utils.book_append_sheet(
      worksheets,
      XLSX.utils.json_to_sheet(accountGroupingData.tags || []),
      "Tags"
    );
    XLSX.writeFileXLSX(worksheets, "Test.xlsx");

    // const blob = new Blob([JSON.stringify(newData2)], { type: "text/json" });
    // const a = document.createElement("a");
    // a.download = "export.json";
    // a.href = window.URL.createObjectURL(blob);
    // const clickEvt = new MouseEvent("click", {
    //   view: window,
    //   bubbles: true,
    //   cancelable: true,
    // });
    // a.dispatchEvent(clickEvt);
    // a.remove();
  };

  return (
    <Button compact onClick={() => getData()}>
      <IconDatabaseExport size={15} />
    </Button>
  );
};

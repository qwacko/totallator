import { format } from "date-fns";
import type { AccountGroupingExportValidationType } from "src/utils/validation/accountGrouping/exportAccountGroupingValidation";
import * as XLSX from "xlsx";
import { exportToImport } from "./exportToImport";

export const exportToExcel = (
  data: AccountGroupingExportValidationType,
  allData: boolean
) => {
  const accountGroupingData = allData ? data : exportToImport(data);
  const filename = `${format(new Date(), "yyyyMMdd")} ${
    data.accountGrouping.title
  } ${allData ? "All Data Export" : "Import Data Export"}.xlsx`;

  const worksheets = XLSX.utils.book_new();
  if (allData) {
    XLSX.utils.book_append_sheet(
      worksheets,
      XLSX.utils.json_to_sheet([data.accountGrouping]),
      "Account Grouping"
    );
  }
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
  XLSX.writeFileXLSX(worksheets, filename);
};

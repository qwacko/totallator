import { format } from "date-fns";
import type { AccountGroupingExportValidationType } from "src/utils/validation/accountGrouping/exportAccountGroupingValidation";
import { exportToImport } from "./exportToImport";

export const exportToJSON = (
  data: AccountGroupingExportValidationType,
  allData: boolean
) => {
  const accountGroupingData = allData ? data : exportToImport(data);
  const filename = `${format(new Date(), "yyyyMMdd")} ${
    data.accountGrouping.title
  } ${allData ? "All Data Export" : "Import Data Export"}.json`;

  const blob = new Blob([JSON.stringify(accountGroupingData)], {
    type: "text/json",
  });
  const a = document.createElement("a");
  a.download = filename;
  a.href = window.URL.createObjectURL(blob);
  const clickEvt = new MouseEvent("click", {
    view: window,
    bubbles: true,
    cancelable: true,
  });
  a.dispatchEvent(clickEvt);
  a.remove();
};

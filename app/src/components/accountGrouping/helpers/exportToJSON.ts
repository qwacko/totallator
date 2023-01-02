import { format } from "date-fns";
import type { AccountGroupingExportValidationType } from "src/utils/validation/accountGrouping/exportAccountGroupingValidation";

export const exportToJSON = (data: AccountGroupingExportValidationType) => {
  const accountGroupingData = data;
  const filename = `${format(new Date(), "yyyyMMdd")} ${
    accountGroupingData.accountGrouping.title
  } Export.json`;

  const blob = new Blob([JSON.stringify(data)], { type: "text/json" });
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

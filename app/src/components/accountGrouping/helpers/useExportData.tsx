import { trpc } from "src/utils/trpc";
import { exportToExcel } from "./exportToExcel";
import { exportToJSON } from "./exportToJSON";

export const useExportData = ({
  accountGroupingId,
}: {
  accountGroupingId: string;
}) => {
  const context = trpc.useContext();

  const exportData = async ({
    excel,
    allData,
  }: {
    excel: boolean;
    allData: boolean;
  }) => {
    const data = await context.accountGroupings.export.fetch({
      accountGroupingId,
    });
    if (excel) exportToExcel(data, allData);
    if (!excel) exportToJSON(data, allData);
  };

  const exportExcelAll = () => exportData({ excel: true, allData: true });
  const exportExcelImport = () => exportData({ excel: true, allData: false });
  const exportJSONAll = () => exportData({ excel: false, allData: true });
  const exportJSONImport = () => exportData({ excel: false, allData: false });

  return {
    exportData,
    exportExcelAll,
    exportExcelImport,
    exportJSONAll,
    exportJSONImport,
  };
};

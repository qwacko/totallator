import type { FileWithPath } from "@mantine/dropzone";
import { read, utils } from "xlsx";

import {
  type BulkUpgradeAccountGroupingValidationType,
  bulkUpdateAccountGroupingValidation
} from "src/utils/validation/accountGrouping/bulkUpgradeAccountGroupingValidation";

export const handleExcelUpload = ({
  files,
  setLoading,
  setUploadedData,
  setError,
  setFilename,
  accountGroupingId
}: {
  files: FileWithPath[];
  setLoading: (data: boolean) => void;
  setUploadedData: (
    data: undefined | BulkUpgradeAccountGroupingValidationType
  ) => void;
  setError: (errors: string | undefined) => void;
  setFilename: (filename: string | undefined) => void;
  accountGroupingId: string;
}) => {
  setLoading(true);
  setUploadedData(undefined);
  setError(undefined);
  setFilename(undefined);
  if (files.length === 1) {
    const file = files[0];
    if (file) {
      try {
        console.log("File Uploaded", file);
        const reader = new FileReader();
        reader.onload = () => {
          const binaryStr = reader.result;
          const excel = read(binaryStr, {
            sheets: [
              "Journals",
              "Accounts",
              "Bills",
              "Budgets",
              "Categories",
              "Tags"
            ],
            cellDates: true
          });
          const journals = excel.Sheets["Journals"]
            ? utils.sheet_to_json(excel.Sheets["Journals"])
            : [];
          const accounts = excel.Sheets["Accounts"]
            ? utils.sheet_to_json(excel.Sheets["Accounts"])
            : [];
          const bills = excel.Sheets["Bills"]
            ? utils.sheet_to_json(excel.Sheets["Bills"])
            : [];
          const budgets = excel.Sheets["Budgets"]
            ? utils.sheet_to_json(excel.Sheets["Budgets"])
            : [];
          const categories = excel.Sheets["Categories"]
            ? utils.sheet_to_json(excel.Sheets["Categories"])
            : [];
          const tags = excel.Sheets["Tags"]
            ? utils.sheet_to_json(excel.Sheets["Tags"])
            : [];

          const processedData = bulkUpdateAccountGroupingValidation.safeParse({
            accountGroupingId: accountGroupingId,
            upsertAccounts: accounts,
            upsertBills: bills,
            upsertBudgets: budgets,
            upsertCategories: categories,
            upsertTags: tags,
            upsertJournalEntries: journals
          });
          if (processedData.success) {
            console.log("Processed Data", processedData);
            setUploadedData(processedData.data);
            setFilename(file.name);
          } else {
            const firstError = processedData.error.issues[0];
            if (firstError) {
              console.log("hasError", firstError);
              setError(
                `Path: ${firstError.path.join(":")}. Message: ${
                  firstError.message
                }`
              );
            }
          }
          setLoading(false);
        };

        reader.readAsArrayBuffer(file);
        return;
      } catch (e) {
        setError("Error Processing File");
        console.log("Error", e);
      }
    } else {
      setError("File Not Found");
    }
  }
  setError("No Files To Process");
  setLoading(false);
};

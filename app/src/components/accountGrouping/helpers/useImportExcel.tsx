import { FileWithPath } from "@mantine/dropzone";
import { type BulkUpgradeAccountGroupingValidationType } from "src/utils/validation/accountGrouping/bulkUpgradeAccountGroupingValidation";
import { useState } from "react";
import { handleExcelUpload } from "./handleExcelUpload";
import { useBulkUpdateAccountGrouping } from "src/utils/hooks/accountGroupings/useBulkUpdateAccountGrouping";

export const useImportExcel = ({
  accountGroupingId,
  onComplete,
}: {
  accountGroupingId: string;
  onComplete?: () => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [uploadedData, setUploadedData] = useState<
    undefined | BulkUpgradeAccountGroupingValidationType
  >(undefined);
  const [filename, setFilename] = useState<string | undefined>(undefined);
  const [errorText, setError] = useState<string | undefined>(undefined);

  const { mutate } = useBulkUpdateAccountGrouping({
    setMutating: setLoading,
    onMutate: onComplete,
  });

  const runMutation = () => {
    if (uploadedData) {
      setLoading(true);
      mutate.mutate(uploadedData);
    }
  };

  const handleUpload = (files: FileWithPath[]) => {
    handleExcelUpload({
      setLoading,
      setUploadedData,
      setError,
      setFilename,
      accountGroupingId,
      files,
    });
  };

  const reset = () => {
    setLoading(false);
    setUploadedData(undefined);
    setFilename(undefined);
    setError(undefined);
  };

  return {
    loading,
    uploadedData,
    filename,
    errorText,
    handleUpload,
    reset,
    runMutation,
  };
};

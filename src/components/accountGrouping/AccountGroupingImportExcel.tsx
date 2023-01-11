import { Button, Group, List, Modal, Stack, Text } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";

import type { AccountGroupingReturnSingle } from "./AccountGroupingCard";
import { useImportExcel } from "./helpers/useImportExcel";

export const AccountGroupingImportExcel = ({
  data,
  opened,
  close
}: {
  data: AccountGroupingReturnSingle;
  opened: boolean;
  close: () => void;
}) => {
  const {
    loading,
    uploadedData,
    filename,
    errorText,
    handleUpload,
    reset,
    runMutation
  } = useImportExcel({ accountGroupingId: data.id, onComplete: () => close() });

  const closeModal = () => {
    reset();
    close();
  };

  return (
    <Modal
      opened={opened}
      onClose={closeModal}
      title="Import Excel Formatted Data"
    >
      <Stack>
        {!uploadedData && !errorText && (
          <Dropzone
            maxFiles={1}
            onDrop={handleUpload}
            accept={[
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            ]}
            loading={loading}
          >
            <Group
              position="center"
              spacing="xl"
              style={{ minHeight: 100, pointerEvents: "none" }}
            >
              <div>
                <Text size="xl" inline>
                  Drag *.xlsx file here or click to select file
                </Text>
                <Text size="sm" color="dimmed" inline mt={7}>
                  File should be of the correct import format.
                </Text>
              </div>
            </Group>
          </Dropzone>
        )}
        {uploadedData && !errorText && (
          <>
            <Text>Loaded File {filename} has the following for import</Text>
            <List>
              <List.Item>
                {uploadedData?.upsertJournalEntries?.length || 0} Journal
                Entries
              </List.Item>
              <List.Item>
                {uploadedData?.upsertAccounts?.length || 0} Accounts
              </List.Item>
              <List.Item>
                {uploadedData?.upsertBills?.length || 0} Bills
              </List.Item>
              <List.Item>
                {uploadedData?.upsertBudgets?.length || 0} Budgets
              </List.Item>
              <List.Item>
                {uploadedData?.upsertCategories?.length || 0} Categories
              </List.Item>
              <List.Item>
                {uploadedData?.upsertTags?.length || 0} Tags
              </List.Item>
            </List>
          </>
        )}
        {Boolean(errorText) && <Text color="red">{errorText}</Text>}
        <Group position="apart">
          <Button variant="outline" onClick={close}>
            Cancel
          </Button>
          <Button onClick={reset} disabled={!uploadedData && !errorText}>
            Clear
          </Button>
          <Button
            color="red"
            disabled={!uploadedData || Boolean(errorText)}
            onClick={runMutation}
          >
            Import
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};

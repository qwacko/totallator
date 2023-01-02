import { Button } from "@mantine/core";
import { IconDatabaseExport } from "@tabler/icons";
import { trpc } from "src/utils/trpc";
4;
import { exportToExcel } from "./helpers/exportToExcel";
import { exportToJSON } from "./helpers/exportToJSON";

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

    exportToExcel(accountGroupingData);
    exportToJSON(accountGroupingData);
  };

  return (
    <Button compact onClick={() => getData()}>
      <IconDatabaseExport size={15} />
    </Button>
  );
};

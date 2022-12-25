import { Button } from "@mantine/core";
import { IconSeeding } from "@tabler/icons";
import { useSeedAccountGrouping } from "src/utils/hooks/accountGroupings/useSeedAccountGrouping";

export const AccountGroupingSeed = ({
  accountGroupingId,
}: {
  accountGroupingId: string;
}) => {
  const seeding = useSeedAccountGrouping({ accountGroupingId });

  if (seeding.isLoading || !seeding.canSeed) {
    return <></>;
  }

  return (
    <Button compact onClick={() => seeding.seed(50)}>
      <IconSeeding size={15} />
    </Button>
  );
};

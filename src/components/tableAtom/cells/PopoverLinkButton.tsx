import { Button } from "@mantine/core";
import { IconChartInfographic } from "@tabler/icons";
import Link from "next/link";

export const PopoverLinkButton = ({ url }: { url: string }) => {
  return (
    <Link href={url} legacyBehavior>
      <Button component="a" href="#" variant="outline">
        <IconChartInfographic />
      </Button>
    </Link>
  );
};

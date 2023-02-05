import { Button, Group, Modal, NumberInput, Stack } from "@mantine/core";
import { type PrimitiveAtom, useAtomValue } from "jotai";
import { useState } from "react";

import { useCloneTransactions } from "src/utils/hooks/journals/useCloneTransactions";

export const CloneSelectedJournalsModal = ({
  opened,
  close,
  rows
}: {
  opened: boolean;
  close: () => void;
  rows: PrimitiveAtom<string[]>;
}) => {
  const ids = useAtomValue(rows);

  const [count, setCount] = useState<number>(1);
  const { clone } = useCloneTransactions({ journalIds: ids, onSuccess: close });

  return (
    <Modal
      opened={opened}
      onClose={close}
      title={`Clone ${ids.length} Transactions?`}
    >
      <Stack>
        <NumberInput
          value={count}
          onChange={(e) => e && setCount(e.valueOf())}
          precision={0}
          label="Number Of Clones"
        />
        <Group position="apart">
          <Button variant="outline" onClick={close}>
            Cancel
          </Button>
          <Button onClick={() => clone(count)}>Clone</Button>
        </Group>
      </Stack>
    </Modal>
  );
};

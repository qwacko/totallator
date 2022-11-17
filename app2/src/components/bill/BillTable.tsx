import {
  Button,
  Group,
  Loader,
  Menu,
  Select,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import { MenuTarget } from "@mantine/core/lib/Menu/MenuTarget/MenuTarget";
import {
  IconArrowsSort,
  IconMenu2,
  IconSortAscending2,
  IconSortAZ,
} from "@tabler/icons";
import { useState } from "react";
import { useAccountGroupings } from "src/utils/hooks/accountGroupings/useAccountGroupings";
import { type billsFilter, useBills } from "src/utils/hooks/bills/useBills";
import { useUpdateBill } from "src/utils/hooks/bills/useUpdateBIll";
import { StatusFilterMenu } from "../table/StatusFilterMenu";

export const BillTable = () => {
  const [filter, setFilter] = useState<billsFilter>({});
  const { bills, isLoading } = useBills({ filter: filter });
  const [textFilter, setTextFilter] = useState<string | undefined>();

  if (!bills || isLoading) {
    return (
      <Group>
        <Loader />
        <Text>Loading Bills</Text>
      </Group>
    );
  }

  return (
    <Table>
      <thead>
        <tr>
          <th>Account Grouping</th>
          <th>
            <Group spacing={10}>
              <Text>Title</Text>
              <Menu closeOnItemClick={false} closeOnClickOutside={true}>
                <Menu.Target>
                  <Button variant="white">
                    <IconMenu2 size={15} />
                  </Button>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item component="div">
                    <TextInput
                      value={textFilter}
                      onBlur={() =>
                        setFilter({ ...filter, titleIncludes: textFilter })
                      }
                      onChange={(e) => setTextFilter(e.currentTarget.value)}
                    />
                  </Menu.Item>
                  <Menu.Item
                    onClick={() =>
                      setFilter({ ...filter, titleIncludes: undefined })
                    }
                  >
                    Reset
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
              <Button variant="white">
                <IconArrowsSort size={15} />
              </Button>
            </Group>
          </th>
          <th>
            <Group>
              <Text>Status</Text>
              <StatusFilterMenu filter={filter} setFilter={setFilter} />
            </Group>
          </th>
        </tr>
      </thead>
      <tbody>
        {bills &&
          bills.map((bill) => {
            return <BillTableRow key={bill.id} id={bill.id} />;
          })}
      </tbody>
    </Table>
  );
};

const BillTableRow = ({ id }: { id: string }) => {
  const { bill, form, runMutate } = useUpdateBill({ id });
  const { data: accountGroupings } = useAccountGroupings();

  if (!bill) {
    return <></>;
  }

  const accountGrouping = accountGroupings?.find(
    (item) => item.id === bill.accountGroupingId
  );

  return (
    <tr key={bill.id}>
      <td>{accountGrouping?.title || ""}</td>
      <td>
        <TextInput {...form.getInputProps("title")} onBlur={runMutate} />
      </td>
      <td>
        <Select
          {...form.getInputProps("status")}
          data={[
            { label: "Active", value: "Active" },
            { label: "Disabled", value: "Disabled" },
            { label: "Deleted", value: "Deleted" },
          ]}
          onBlur={runMutate}
        />
      </td>
    </tr>
  );
};

import { Group, Loader, Select, Table, Text, TextInput } from "@mantine/core";
import { useState } from "react";
import { useAccountGroupings } from "src/utils/hooks/accountGroupings/useAccountGroupings";
import {
  type billsFilter,
  useBills,
  type billsSort,
} from "src/utils/hooks/bills/useBills";
import { useUpdateBill } from "src/utils/hooks/bills/useUpdateBIll";
import { SortButton } from "../table/SortButton";
import { StatusFilterMenu } from "../table/StatusFilterMenu";
import { TextFilterMenu } from "../table/TextFilterMenu";

export const BillTable = () => {
  const [filter, setFilter] = useState<billsFilter>({});
  const [sort, setSort] = useState<billsSort | undefined>();
  const { bills, isLoading } = useBills({ filter, sort });

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
              <TextFilterMenu
                filter={filter}
                setFilter={setFilter}
                targetKey="titleIncludes"
              />
              <SortButton sort={sort} setSort={setSort} targetKey="title" />
            </Group>
          </th>
          <th>
            <Group>
              <Text>Status</Text>
              <StatusFilterMenu filter={filter} setFilter={setFilter} />
              <SortButton sort={sort} setSort={setSort} targetKey="status" />
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

import { Group, Pagination, Select } from "@mantine/core";
import { useAtom } from "jotai";
import { type JournalTableConfigAtomReturn } from "src/utils/hooks/journals/useJournalsSimple";

export const AtomPagination = ({
    paginationAtom
}: {
    paginationAtom: JournalTableConfigAtomReturn["paginationAtom"];
}) => {
    const [pagination, setPagination] = useAtom(paginationAtom);

    return (
        <Group>
            <Pagination
                page={pagination.pageIndex + 1}
                total={(pagination.rowCount || 0) / pagination.pageSize}
                onChange={(newValue) => setPagination({
                    ...pagination,
                    pageIndex: newValue - 1
                })} />
            <Select
                value={pagination.pageSize.toString()}
                data={[
                    { label: "1 Row", value: "1" },
                    { label: "10 Rows", value: "10" },
                    { label: "20 Rows", value: "20" }
                ]}
                onChange={(newValue) => {
                    console.log("Updating Pagination", newValue);
                    setPagination({
                        ...pagination,
                        pageSize: Number(newValue)
                    });
                }} />
        </Group>
    );
};

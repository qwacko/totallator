import type { JournalEntryFilter, SortDirection } from '$lib/graphqlClient/generated';

export type TableContextType = {
	sort: { key: string; type: SortDirection }[];
	filter: JournalEntryFilter;
	multisort: boolean;
};
export const TableContextKey = 'TableContext';

export type TableSelectedContextType<RowData> = { data: RowData[]; singleSelect: boolean };
export const TableSelectContextKey = 'TableSelectContext';

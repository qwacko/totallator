import type { TableContextType } from '$lib/components/Table/TableStores';
import { processSort } from '$lib/components/Table/processSort';
import type { BillSort, InputMaybe } from '$lib/graphqlClient/generated';

export const onBillSort = (
	e: CustomEvent<TableContextType['sort']>,
	setSort: (value: InputMaybe<BillSort | BillSort[]> | undefined) => void
) => {
	setSort(
		e.detail.map((item): BillSort => {
			return {
				title: processSort(item.key === 'title', item.type),
				active: processSort(item.key === 'active', item.type),
				disabled: processSort(item.key === 'disabled', item.type),
				deleted: processSort(item.key === 'deleted', item.type),
				allowUpdate: processSort(item.key === 'allowUpdate', item.type)
			};
		})
	);
};

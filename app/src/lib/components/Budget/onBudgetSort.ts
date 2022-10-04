import type { TableContextType } from '$lib/components/Table/TableStores';
import { processSort } from '$lib/components/Table/processSort';
import type { BudgetSort, InputMaybe } from '$lib/graphqlClient/generated';

export const onBudgetSort = (
	e: CustomEvent<TableContextType['sort']>,
	setSort: (value: InputMaybe<BudgetSort | BudgetSort[]> | undefined) => void
) => {
	setSort(
		e.detail.map((item): BudgetSort => {
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

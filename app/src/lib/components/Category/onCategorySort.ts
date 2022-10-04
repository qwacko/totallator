import type { TableContextType } from '$lib/components/Table/TableStores';
import { processSort } from '$lib/components/Table/processSort';
import type { CategorySort, InputMaybe } from '$lib/graphqlClient/generated';

export const onCategorySort = (
	e: CustomEvent<TableContextType['sort']>,
	setSort: (value: InputMaybe<CategorySort | CategorySort[]> | undefined) => void
) => {
	setSort(
		e.detail.map((item): CategorySort => {
			return {
				title: processSort(item.key === 'title', item.type),
				group: processSort(item.key === 'group', item.type),
				single: processSort(item.key === 'single', item.type),
				active: processSort(item.key === 'active', item.type),
				disabled: processSort(item.key === 'disabled', item.type),
				deleted: processSort(item.key === 'deleted', item.type),
				allowUpdate: processSort(item.key === 'allowUpdate', item.type)
			};
		})
	);
};

import type { TableContextType } from '$lib/components/Table/TableStores';
import { processSort } from '$lib/components/Table/processSort';
import type { InputMaybe, TagSort } from '$lib/graphqlClient/generated';

export const onTagSort = (
	e: CustomEvent<TableContextType['sort']>,
	setSort: (value: InputMaybe<TagSort | TagSort[]> | undefined) => void
) => {
	setSort(
		e.detail.map((item): TagSort => {
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

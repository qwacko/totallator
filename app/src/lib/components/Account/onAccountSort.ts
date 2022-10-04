import type { TableContextType } from '$lib/components/Table/TableStores';
import { processSort } from '$lib/components/Table/processSort';
import type { AccountSort, InputMaybe } from '$lib/graphqlClient/generated';

export const onAccountSort = (
	e: CustomEvent<TableContextType['sort']>,
	setSort: (value: InputMaybe<AccountSort | AccountSort[]> | undefined) => void
) => {
	setSort(
		e.detail.map((item): AccountSort => {
			return {
				title: processSort(item.key === 'title', item.type),
				isCash: processSort(item.key === 'isCash', item.type),
				isNetWorth: processSort(item.key === 'isCash', item.type),
				accountGroup: processSort(item.key === 'accountGroup', item.type),
				accountGroup2: processSort(item.key === 'accountGroup2', item.type),
				accountGroup3: processSort(item.key === 'accountGroup3', item.type),
				accountGroupCombined: processSort(item.key === 'accountGroupCombined', item.type),
				accountTitleCombined: processSort(item.key === 'accountTitleCombined', item.type),
				active: processSort(item.key === 'active', item.type),
				disabled: processSort(item.key === 'disabled', item.type),
				deleted: processSort(item.key === 'deleted', item.type),
				allowUpdate: processSort(item.key === 'allowUpdate', item.type),
				startDate: processSort(item.key === 'startDate', item.type),
				endDate: processSort(item.key === 'endDate', item.type)
			};
		})
	);
};

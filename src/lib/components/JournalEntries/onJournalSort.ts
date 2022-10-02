import type { TableContextType } from '$lib/components/Table/TableStores';
import { processSort } from '$lib/components/Table/processSort';
import type { InputMaybe, JournalEntrySort } from '$lib/graphqlClient/generated';

export const onJournalSort = (
	e: CustomEvent<TableContextType['sort']>,
	setSort: (value: InputMaybe<JournalEntrySort | JournalEntrySort[]> | undefined) => void
) => {
	setSort(
		e.detail.map((item): JournalEntrySort => {
			return {
				amount: processSort(item.key === 'amount', item.type),
				date: processSort(item.key === 'date', item.type),
				description: processSort(item.key === 'description', item.type),
				account:
					item.key === 'account'
						? { title: processSort(item.key === 'account', item.type) }
						: undefined,
				accountGrouping:
					item.key === 'accountGrouping'
						? { title: processSort(item.key === 'accountGrouping', item.type) }
						: undefined
			};
		})
	);
};

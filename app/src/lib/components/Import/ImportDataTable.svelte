<script lang="ts">
	import type { ImportDataProcessed } from '$lib/graphqlClient/generated';
	import { uniq } from 'lodash-es';

	export let data: ImportDataProcessed[];

	const columnConfig: { title: string; key: keyof ImportDataProcessed }[] = [
		{ title: 'Checked', key: 'dataChecked' },
		{ title: 'Reconciled', key: 'reconciled' },
		{ title: 'Complete', key: 'complete' },
		{ title: 'Linked', key: 'linked' },
		{ title: 'Date', key: 'date' },
		{ title: 'Description', key: 'description' },
		{ title: 'Account', key: 'accountTitle' },
		{ title: 'Amount', key: 'amount' },
		{ title: 'Category', key: 'categoryTitle' },
		{ title: 'Bill', key: 'billTitle' },
		{ title: 'Budget', key: 'budgetTitle' },
		{ title: 'Tag', key: 'tagTitle' }
	];

	$: transactionIds = uniq(data.map((item) => item.transactionId));
	$: groupedData = transactionIds.map((trans) => {
		return data
			.filter((journal) => journal.transactionId === trans)
			.sort((a, b) => b.amount - a.amount);
	});

	//TODO Make different import modes (Add New Only, Update, Add and Update, Clean and Add)
</script>

<table class="mx-4 overflow-y-auto">
	<thead>
		{#each columnConfig as currentColumn}
			<th class="text-center p-2">{currentColumn.title}</th>
		{/each}
	</thead>
	{#each groupedData as currentTransaction, i}
		<tbody class:bg-gray-200={i % 2 == 0}>
			{#each currentTransaction as currentRow}
				<tr>
					{#each columnConfig as currentColumn}
						<td class="text-center px-2 whitespace-nowrap">
							{currentRow[currentColumn.key] || ''}
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	{/each}
</table>

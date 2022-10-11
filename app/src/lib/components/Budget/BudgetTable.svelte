<script lang="ts">
	import type { BudgetFilter, BudgetSort, InputMaybe } from '$lib/graphqlClient/generated';
	import { getContextClient } from '@urql/svelte';

	import InlineSpinner from '../Basic/InlineSpinner.svelte';
	import Pagination from '../Table/Pagination.svelte';
	import Table from '../Table/Table.svelte';
	import TableCell from '../Table/TableCell.svelte';
	import TableColumnHead from '../Table/TableColumnHead.svelte';
	import { budgetTableRefreshTrigger } from './budgetStores';
	import { BudgetTableColumnConfig } from './BudgetTableConfig';
	import { getBudgets } from './getBudgets';
	import { onBudgetFilter } from './onBudgetFilter';
	import { onBudgetSort } from './onBudgetSort';

	export let loading = false;
	export let offset = 0;
	export let pageSize = 25;
	export let sort: InputMaybe<BudgetSort | BudgetSort[]> | undefined = undefined;
	export let filter: InputMaybe<BudgetFilter> | undefined = undefined;

	const client = getContextClient();
	$: data = getBudgets(client, { sort, offset, limit: pageSize, filter });
	$: $budgetTableRefreshTrigger && data.refetch();
	$: BudgetColumnConfig = BudgetTableColumnConfig(client);
	$: useData = $data?.data?.budgets?.budgets ? $data.data.budgets.budgets : undefined;
	$: numberItems = $data?.data?.budgets?.count || 0;
	$: loading = $data.fetching;
</script>

<div class="tableWrapper">
	<div class="tableWrapper2">
		<Table
			data={useData}
			multisort={true}
			on:sort={(e) => onBudgetSort(e, (value) => (sort = value))}
			on:filter={(e) => onBudgetFilter(e, (value) => (filter = value))}>
			<svelte:fragment slot="head">
				{#each BudgetColumnConfig as colConfig}
					<TableColumnHead config={colConfig} />
				{/each}
			</svelte:fragment>

			<svelte:fragment slot="info">
				{#if (useData && useData.length < 1 && !loading) || (!useData && !loading)}
					<div
						class="flex h-20 w-full flex-row content-center items-center justify-center bg-gray-200 ">
						<div class="flex text-lg font-bold">No Budgets Found</div>
					</div>
				{/if}
				{#if !useData && loading}
					<div
						class="flex h-20 w-full flex-row content-center items-center justify-center gap-2 bg-gray-200 ">
						<div class="flex text-lg font-bold">Loading</div>
						<InlineSpinner />
					</div>
				{/if}
			</svelte:fragment>

			<svelte:fragment slot="bodyRow" let:currentData>
				{#each BudgetColumnConfig as colConfig}
					<TableCell config={colConfig} data={currentData} />
				{/each}
			</svelte:fragment>
		</Table>
		<div class="flex flex-row justify-end">
			<Pagination {numberItems} bind:pageSize bind:offset />
		</div>
	</div>
</div>

<style lang="postcss">
	.tableWrapper {
		@apply flex w-full justify-center pt-4 lg:px-2;
	}

	.tableWrapper2 {
		@apply flex flex-col overflow-x-scroll lg:rounded-xl lg:border lg:shadow-xl;
	}
</style>

<script lang="ts">
	import type { CategoryFilter, CategorySort, InputMaybe } from '$lib/graphqlClient/generated';
	import { getContextClient } from '@urql/svelte';

	import InlineSpinner from '../Basic/InlineSpinner.svelte';
	import Pagination from '../Table/Pagination.svelte';
	import Table from '../Table/Table.svelte';
	import TableCell from '../Table/TableCell.svelte';
	import TableColumnHead from '../Table/TableColumnHead.svelte';
	import { CategoryTableColumnConfig } from './CategoryTableConfig';
	import { getCategories } from './getCategories';
	import { onCategoryFilter } from './onCategoryFilter';
	import { onCategorySort } from './onCategorySort';

	export let loading = false;
	export let offset = 0;
	export let pageSize = 25;
	export let sort: InputMaybe<CategorySort | CategorySort[]> | undefined = undefined;
	export let filter: InputMaybe<CategoryFilter> | undefined = undefined;

	const client = getContextClient();
	$: data = getCategories(client, { sort, offset, limit: pageSize, filter });
	$: CategoryColumnConfig = CategoryTableColumnConfig(client);
	$: useData = $data?.data?.categories?.categories ? $data.data.categories.categories : undefined;
	$: numberItems = $data?.data?.categories?.count || 0;
	$: loading = $data.fetching;
</script>

<div class="tableWrapper">
	<div class="tableWrapper2">
		<Table
			data={useData}
			multisort={true}
			on:sort={(e) => onCategorySort(e, (value) => (sort = value))}
			on:filter={(e) => onCategoryFilter(e, (value) => (filter = value))}>
			<svelte:fragment slot="head">
				{#each CategoryColumnConfig as colConfig}
					<TableColumnHead config={colConfig} />
				{/each}
			</svelte:fragment>

			<svelte:fragment slot="info">
				{#if (useData && useData.length < 1 && !loading) || (!useData && !loading)}
					<div
						class="flex h-20 w-full flex-row content-center items-center justify-center bg-gray-200 ">
						<div class="flex text-lg font-bold">No Categories Found</div>
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
				{#each CategoryColumnConfig as colConfig}
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

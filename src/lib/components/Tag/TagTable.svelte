<script lang="ts">
	import type { InputMaybe, TagFilter, TagSort } from '$lib/graphqlClient/generated';
	import { getContextClient } from '@urql/svelte';

	import InlineSpinner from '../Basic/InlineSpinner.svelte';
	import Pagination from '../Table/Pagination.svelte';
	import Table from '../Table/Table.svelte';
	import TableCell from '../Table/TableCell.svelte';
	import TableColumnHead from '../Table/TableColumnHead.svelte';
	import { TagTableColumnConfig } from './TagTableConfig';
	import { getTags } from './getTags';
	import { onTagFilter } from './onTagFilter';
	import { onTagSort } from './onTagSort';

	export let loading = false;
	export let offset = 0;
	export let pageSize = 25;
	export let sort: InputMaybe<TagSort | TagSort[]> | undefined = undefined;
	export let filter: InputMaybe<TagFilter> | undefined = undefined;

	const client = getContextClient();
	$: data = getTags(client, { sort, offset, limit: pageSize, filter });
	$: TagColumnConfig = TagTableColumnConfig(client);
	$: useData = $data?.data?.tags?.tags ? $data.data.tags.tags : undefined;
	$: numberItems = $data?.data?.tags?.count || 0;
	$: loading = $data.fetching;
</script>

<div class="tableWrapper">
	<div class="tableWrapper2">
		<Table
			data={useData}
			multisort={true}
			on:sort={(e) => onTagSort(e, (value) => (sort = value))}
			on:filter={(e) => onTagFilter(e, (value) => (filter = value))}>
			<svelte:fragment slot="head">
				{#each TagColumnConfig as colConfig}
					<TableColumnHead config={colConfig} />
				{/each}
			</svelte:fragment>

			<svelte:fragment slot="info">
				{#if (useData && useData.length < 1 && !loading) || (!useData && !loading)}
					<div
						class="flex h-20 w-full flex-row content-center items-center justify-center bg-gray-200 ">
						<div class="flex text-lg font-bold">No Tags Found</div>
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
				{#each TagColumnConfig as colConfig}
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

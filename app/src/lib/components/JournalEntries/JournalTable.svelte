<script lang="ts">
	import Modal from '$lib/components/Basic/Modal.svelte';
	import type {
		GetJournalsQueryVariables,
		InputMaybe,
		JournalEntryFilter,
		JournalEntrySort
	} from '$lib/graphqlClient/generated';
	import { getContextClient } from '@urql/svelte';
	import type { OperationResultStore } from '@urql/svelte/dist/types/common';

	import InlineSpinner from '../Basic/InlineSpinner.svelte';
	import Pagination from '../Table/Pagination.svelte';
	import Table from '../Table/Table.svelte';
	import TableCell from '../Table/TableCell.svelte';
	import TableColumnHead from '../Table/TableColumnHead.svelte';
	import EditJournals from './EditJournals.svelte';
	import { JournalTableColumnConfig } from './JournalTableConfig';
	import { addTotalsToJournals, type addTotalsToJournalsType } from './addTotalsToJournals';
	import { getJournals } from './getJournals';
	import { getJournalActions } from './journalActions';
	import { mergeJournalFilter } from './mergeJournalFilter';
	import { onJournalFilter } from './onJournalFilter';
	import { onJournalSort } from './onJournalSort';
	import { journalEntryTableRefreshTrigger } from './journalEntryStores';

	export let loading = false;
	export let offset = 0;
	export let pageSize = 25;
	export let sort: InputMaybe<JournalEntrySort | JournalEntrySort[]> | undefined = undefined;
	export let externalFilter: InputMaybe<JournalEntryFilter> | undefined = undefined;

	export let selection: addTotalsToJournalsType = [];

	let internalFilter: InputMaybe<JournalEntryFilter> | undefined = undefined;

	let queryVariables: GetJournalsQueryVariables = {};
	let actionsResultStore: OperationResultStore;
	const client = getContextClient();

	let openEditPopup = false;

	$: filter = mergeJournalFilter(internalFilter, externalFilter);
	$: JournalColumnConfig = JournalTableColumnConfig(client);
	$: queryVariables = { filter, sort, limit: pageSize, offset };
	$: data = getJournals(client, queryVariables);
	$: useData = addTotalsToJournals($data.data?.journalEntries);
	$: numberItems = $data.data?.journalEntries?.count || 0;
	$: loading = $data.fetching || $data.stale || false;
	$: actions = getJournalActions({
		client,
		selection,
		setExternalOperationStore: (newValue) => (actionsResultStore = newValue),
		openEditPopup: () => (openEditPopup = true)
	});

	//Refetch when one of the actions is complete
	$: if ($actionsResultStore && !$actionsResultStore.fetching) data.refetch();

	//Refetch when transaction created
	$: $journalEntryTableRefreshTrigger && data.refetch();
</script>

<Modal bind:show={openEditPopup}>
	{#if openEditPopup}
		<div class="flex flex-col items-center gap-2">
			<div class="flex text-lg font-bold">
				Edit {selection?.length} Journal{selection && selection.length > 0 ? 's' : ''}
			</div>
			<EditJournals
				journals={selection}
				bind:popupOpen={openEditPopup}
				on:complete={() => (openEditPopup = false)} />
		</div>
	{/if}
</Modal>

<div class="tableWrapper">
	<div class="tableWrapper2">
		<Table
			data={useData}
			bind:selectedRows={selection}
			multisort={true}
			on:sort={(e) => onJournalSort(e, (value) => (sort = value))}
			on:filter={(e) => onJournalFilter(e, (value) => (internalFilter = value))}
			{actions}>
			<svelte:fragment slot="head">
				{#each JournalColumnConfig as colConfig}
					<TableColumnHead config={colConfig} />
				{/each}
			</svelte:fragment>

			<svelte:fragment slot="info">
				{#if (useData && useData.length < 1 && !loading) || (!useData && !loading)}
					<div
						class="flex h-20 w-full flex-row content-center items-center justify-center bg-gray-200 ">
						<div class="flex text-lg font-bold">No Journals Found</div>
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
				{#each JournalColumnConfig as colConfig}
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

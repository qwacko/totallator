<script lang="ts">
	import { debounce } from 'lodash-es';
	import { createEventDispatcher, setContext } from 'svelte';
	import { writable } from 'svelte/store';

	import TableBody from './TableBody.svelte';
	import TableCellSelect from './TableCellSelect.svelte';
	import TableColumnSelectHead from './TableColumnSelectHead.svelte';
	import TableHead from './TableHead.svelte';
	import TableRow from './TableRow.svelte';
	import { TableContextKey, TableSelectContextKey } from './TableStores';
	import type { TableContextType, TableSelectedContextType } from './TableStores';
	import type { TableBulkActions, TableDataType } from './TableTypes';

	type T = $$Generic; /* eslint-disable-line no-undef */
	type DataType = TableDataType<T>;

	// Exports
	export let multisort = false;
	export let data: DataType[] | undefined | null = [];
	export let debounceTime: number = 200;
	export let rowSelectionActive = true;
	export let selectedRows: DataType[] = [];
	export let actions: TableBulkActions<DataType[]> | undefined = undefined;

	//Setup Table Context Store
	const tableContextStore = writable<TableContextType>({ sort: [], filter: {}, multisort: false });
	setContext(TableContextKey, tableContextStore);
	$: $tableContextStore.multisort = multisort;

	//Setup Table Context Store
	const tableSelectContextStore = writable<TableSelectedContextType<DataType>>({
		data: [],
		singleSelect: false
	});
	setContext(TableSelectContextKey, tableSelectContextStore);

	//Update Selected Rows For External Use
	$: selectedRows = $tableSelectContextStore.data;

	//Debounce To Limit Server Requests
	const filterDebounce = debounce(
		(value: TableContextType['filter']) => dispatch('filter', value),
		debounceTime
	);

	//Debounce To Limit Server Requests (Set to zero, as this isn't really needed)
	const sortDebounce = debounce((value: TableContextType['sort']) => dispatch('sort', value), 0);

	//Event Dispatcher(s)
	const dispatch = createEventDispatcher();
	$: sortDebounce($tableContextStore.sort);
	$: filterDebounce($tableContextStore.filter);

	// LATER Add Bulk Addition (inline Preferrable) - Possibly Bulk Cloning With Edit Handles This
	// LATER Add ability to adjust font  / spacing sizing.
</script>

<div class="text-2xs flex flex-col">
	<div class="flex">
		<table class="border-spacing">
			<TableHead>
				{#if rowSelectionActive}
					<TableColumnSelectHead allRows={data} {actions} />
				{/if}
				<slot name="head" />
			</TableHead>
			<TableBody>
				{#if data}
					{#each data as currentData}
						<TableRow id={currentData.id}>
							{#if rowSelectionActive}
								<TableCellSelect rowData={currentData} />
							{/if}
							<slot name="bodyRow" {currentData} />
						</TableRow>
					{/each}
				{/if}
			</TableBody>
		</table>
	</div>
	<slot name="info" />
</div>

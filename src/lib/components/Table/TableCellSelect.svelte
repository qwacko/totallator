<script lang="ts">
	import { getContext, onDestroy } from 'svelte';
	import type { Writable } from 'svelte/store';

	import { TableSelectContextKey, type TableSelectedContextType } from './TableStores';
	import type { TableDataType } from './TableTypes';

	type T = $$Generic; /* eslint-disable-line no-undef */
	type DataType = TableDataType<T>;

	export let rowData: DataType;

	// Ensures that on removal of the checkbox, the selection is cleared.
	onDestroy(() => {
		$tableSelectedContext.data = $tableSelectedContext.data.filter(
			(item) => item.id !== rowData.id
		);
	});

	const tableSelectedContext =
		getContext<Writable<TableSelectedContextType<DataType>>>(TableSelectContextKey);

	$: selected = $tableSelectedContext.data.map((item) => item.id).includes(rowData.id);

	const updateSelectionRowData = (newRowData: DataType) => {
		const isSelected = $tableSelectedContext.data.map((item) => item.id).includes(newRowData.id);
		if (isSelected) {
			$tableSelectedContext.data = [
				...$tableSelectedContext.data.filter((item) => item.id !== newRowData.id),
				newRowData
			];
		}
	};

	$: updateSelectionRowData(rowData);

	const toggleSelection = () => {
		if ($tableSelectedContext.singleSelect) {
			$tableSelectedContext.data = [rowData];
		} else {
			if (selected) {
				$tableSelectedContext.data = $tableSelectedContext.data.filter(
					(item) => item.id !== rowData.id
				);
			} else {
				$tableSelectedContext.data = [...$tableSelectedContext.data, rowData];
			}
		}
	};

	const editable = false;
</script>

<td
	id={`${rowData.id}.select.cell`}
	class:editable
	class:notEditable={!editable}
	class={selected ? 'bg-blue-600' : ''}
	on:click={() => toggleSelection()}>
	<div class="flex h-full w-full place-content-center">
		<input type="checkbox" class="inputStyling flex" checked={selected} />
	</div>
</td>

<style lang="postcss">
	.inputStyling {
		@apply accent-blue-600;
	}

	td {
		@apply focus-within:ring-1;
	}

	td.editable {
		@apply hover:ring-1;
	}

	td.notEditable {
		@apply bg-gray-100 hover:bg-gray-400;
	}
</style>

<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { OperationResultStore } from '@urql/svelte/dist/types/common';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	import InlineSpinner from '../Basic/InlineSpinner.svelte';
	import toastsStore from '../Toasts/toastsStore';
	import { TableSelectContextKey, type TableSelectedContextType } from './TableStores';
	import type { TableBulkActions, TableBulkActionsProps, TableDataType } from './TableTypes';

	type T = $$Generic; /* eslint-disable-line no-undef */
	type DataType = TableDataType<T>;

	export let allRows: DataType[] | undefined | null;
	export let actions: TableBulkActions<DataType[]> | undefined = undefined;

	let loading = false;
	const setLoading = (newValue: boolean) => (loading = newValue);
	const setSelected = (newValue: DataType[]) => ($tableSelectedContext.data = newValue);

	let operationResult: OperationResultStore;
	const setOperationStore = (newValue: OperationResultStore) => (operationResult = newValue);

	let tableBulkActionArgs: TableBulkActionsProps<DataType[]>;
	$: tableBulkActionArgs = {
		items: $tableSelectedContext.data,
		setLoading,
		setSelected,
		setOperationStore
	};

	$: if ($operationResult && $operationResult.error) {
		toastsStore.addToast({
			title: 'Update Error',
			description: $operationResult.error.message,
			duration: 1000,
			type: 'error',
			style: 'filled'
		});
	}

	const tableSelectedContext =
		getContext<Writable<TableSelectedContextType<DataType>>>(TableSelectContextKey);

	$: allSelected = allRows?.length === $tableSelectedContext.data.length;
	$: someSelected = $tableSelectedContext.data.length > 0;
	$: selectedCount = $tableSelectedContext.data.length;
	$: isLoading = loading || ($operationResult && $operationResult.fetching);
</script>

<th class=" hover:bg-gray-200">
	<div class="flex w-full flex-row items-center justify-center gap-2 p-3">
		<div class="flex">
			{#if isLoading}
				<InlineSpinner hidden={false} colour="blue" size="md" />
			{:else if allSelected}
				<div on:click={() => ($tableSelectedContext.data = [])}>
					<Icon icon="carbon:checkbox-checked" class="h-4 w-4" />
				</div>
			{:else if someSelected}
				<div on:click={() => ($tableSelectedContext.data = [])}>
					<Icon icon="carbon:checkbox-indeterminate" class="h-4 w-4" />
				</div>
			{:else}
				<div
					on:click={() => {
						if (allRows) {
							$tableSelectedContext.data = allRows;
						}
					}}>
					<Icon icon="carbon:checkbox" class="h-4 w-4" />
				</div>
			{/if}
		</div>
		{#if actions && actions.length > 0}
			<div class="dropdown-hover dropdown">
				<Icon icon="fa6-solid:caret-down" class="h-4 w-4 text-gray-400" />
				<div class="dropdown-content flex flex-col gap-2 rounded-sm bg-base-100 p-2 shadow">
					<div class="flex w-full place-content-center ">{selectedCount} selected</div>
					{#each actions as currentAction}
						<div
							class:tooltip={currentAction.disabled}
							class="tooltip-right tooltip-warning"
							data-tip={currentAction.disabled ? currentAction.disabledReason : undefined}>
							<button
								disabled={currentAction.disabled}
								on:click={() =>
									currentAction &&
									currentAction.action &&
									currentAction.action(tableBulkActionArgs)}>
								{currentAction.title}
							</button>
						</div>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</th>

<style lang="postcss">
	button {
		@apply flex w-40 place-content-center overflow-auto rounded-sm border-gray-500 bg-gray-200 p-2 text-center shadow-md hover:bg-gray-400;
		@apply disabled:bg-gray-100 disabled:text-gray-400;
	}
</style>

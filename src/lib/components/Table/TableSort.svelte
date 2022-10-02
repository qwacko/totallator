<script lang="ts">
	import { SortDirection } from '$lib/graphqlClient/generated';
	import Icon from '@iconify/svelte';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	import { TableContextKey } from './TableStores';
	import type { TableContextType } from './TableStores';
	import type { TableColumnConfig } from './TableTypes';

	const tableContext = getContext<Writable<TableContextType>>(TableContextKey);

	$: currentSort = $tableContext.sort
		.map((item, index) => ({ ...item, index }))
		.find((item) => item.key === config.id);

	type T = $$Generic; /* eslint-disable-line no-undef */
	export let config: TableColumnConfig<T>;

	const toggleSort = () => {
		if (config.sortable) {
			if ($tableContext.multisort && is_ctrl_down) {
				if (!currentSort) {
					$tableContext.sort = [...$tableContext.sort, { key: config.id, type: SortDirection.Asc }];
				} else if (currentSort.type === SortDirection.Asc) {
					$tableContext.sort = $tableContext.sort.map((item) =>
						item.key === config.id ? { ...item, type: SortDirection.Desc } : item
					);
				} else {
					$tableContext.sort = $tableContext.sort.filter((item) => item.key !== config.id);
				}
			} else {
				if (currentSort && currentSort.type === SortDirection.Asc) {
					$tableContext.sort = [{ key: config.id, type: SortDirection.Desc }];
				} else if (currentSort && currentSort.type === SortDirection.Desc) {
					$tableContext.sort = [];
				} else {
					$tableContext.sort = [{ key: config.id, type: SortDirection.Asc }];
				}
			}
		}
	};

	let is_ctrl_down = false;

	function on_key_down(event: KeyboardEvent) {
		if (event.repeat) return;
		event.key === 'Control' ? (is_ctrl_down = true) : true;
	}

	function on_key_up(event: KeyboardEvent) {
		event.key === 'Control' ? (is_ctrl_down = false) : true;
	}
</script>

<svelte:window on:keydown={on_key_down} on:keyup={on_key_up} />

{#if config.sortable}
	<div class="flex h-full flex-row items-end" on:click={toggleSort}>
		{#if currentSort}
			{#if currentSort.type === SortDirection.Asc}
				<Icon icon="bi:sort-down-alt" width="25" class="text-gray-500" />
			{:else}
				<Icon icon="bi:sort-up-alt" width="25" class="text-gray-500" />
			{/if}
			<div class="self-start text-xs">
				{currentSort.index}
			</div>
		{:else}
			<Icon icon="bi:sort-down-alt" width="25" class="text-gray-200 hover:text-gray-400" />
		{/if}
	</div>
{/if}

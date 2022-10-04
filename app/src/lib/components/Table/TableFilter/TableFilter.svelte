<script lang="ts">
	import Icon from '@iconify/svelte';
	import { get } from 'lodash-es';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	import { TableContextKey } from './../TableStores';
	import type { TableContextType } from './../TableStores';
	import type { TableFilterTypes } from './../TableTypes';
	import TableFilterAmount from './TableFilterAmount.svelte';
	import TableFilterBoolean from './TableFilterBoolean.svelte';
	import TableFilterDate from './TableFilterDate.svelte';
	import TableFilterOptions from './TableFilterOptions.svelte';
	import TableFilterText from './TableFilterText.svelte';

	const tableContext = getContext<Writable<TableContextType>>(TableContextKey);

	export let types: TableFilterTypes[];

	let hasFilter = false;
	$: hasFilterArray = types.map((item) => get($tableContext, `filter.${item.key}`));
	$: hasFilter = hasFilterArray.filter((item) => item !== undefined).length > 0;
</script>

<div class="dropdown-hover dropdown-end dropdown">
	<div tabindex="0" class="filtButton">
		{#if hasFilter}
			<Icon icon="clarity:filter-solid" class="w-4 text-gray-500" />
		{:else}
			<Icon icon="clarity:filter-line" class="w-4" />
		{/if}
	</div>
	<div tabindex="0" class="dropdown-content flex flex-col gap-1 rounded-sm bg-base-100 p-2 shadow">
		{#each types as currentType}
			<div class="flex flex-col">
				{#if currentType.title}
					<div class="text-bold flex text-sm">
						{currentType.title}
					</div>
				{/if}
				{#if currentType.filterType === 'text'}
					<TableFilterText config={currentType} />
				{:else if currentType.filterType === 'boolean'}
					<TableFilterBoolean config={currentType} />
				{:else if currentType.filterType === 'date'}
					<TableFilterDate config={currentType} />
				{:else if currentType.filterType === 'amount'}
					<TableFilterAmount config={currentType} />
				{:else if currentType.filterType === 'options'}
					<TableFilterOptions config={currentType} />
				{/if}
			</div>
		{/each}
	</div>
</div>

<style lang="postcss">
	.filtButton {
		@apply cursor-pointer text-gray-300 hover:text-gray-500;
	}
</style>

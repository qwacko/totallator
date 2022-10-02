<script lang="ts">
	import TableFilter from './TableFilter/TableFilter.svelte';
	import TableSort from './TableSort.svelte';
	import type { TableColumnConfig } from './TableTypes';

	type T = $$Generic; /* eslint-disable-line no-undef */
	export let config: TableColumnConfig<T>;
</script>

<th class=" hover:bg-gray-200">
	<div class="flex w-full flex-col">
		<div class="flex w-full flex-row items-center justify-center gap-2 p-3">
			<div class="flex">{config.title}</div>
			<TableSort {config} />
			{#if config.filterType}
				<TableFilter types={config.filterType} />
			{/if}
		</div>
		<slot />
	</div>
</th>

<script lang="ts">
	import { debounce, get, set } from 'lodash-es';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	import { TableContextKey } from './../TableStores';
	import type { TableContextType } from './../TableStores';
	import type { TableFilterAmount } from './../TableTypes';

	const tableContext = getContext<Writable<TableContextType>>(TableContextKey);

	const dateDebounced = debounce(
		(newValue: number | undefined) =>
			($tableContext = set($tableContext, `filter.${key}`, newValue)),
		500
	);
	export let config: TableFilterAmount;
	$: key = config.key;
	let currentValue: number | undefined;

	const updateFilterDate = (newFilter: number) => {
		if (newFilter !== currentValue) {
			currentValue = newFilter;
		}
	};

	$: dateDebounced(currentValue);
	$: updateFilterDate(get($tableContext.filter, key));

	// @ts-expect-error Value can actually be a string
	$: if (currentValue === '' || currentValue === null) currentValue = undefined;
</script>

<input bind:value={currentValue} type="number" class="border p-1 font-normal outline-none" />

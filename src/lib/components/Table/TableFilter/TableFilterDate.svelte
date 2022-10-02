<script lang="ts">
	import { debounce, get, set } from 'lodash-es';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	import { TableContextKey } from './../TableStores';
	import type { TableContextType } from './../TableStores';
	import type { TableFilterDate } from './../TableTypes';

	const tableContext = getContext<Writable<TableContextType>>(TableContextKey);

	const dateDebounced = debounce(
		(newValue: Date | undefined) => ($tableContext = set($tableContext, `filter.${key}`, newValue)),
		500
	);
	export let config: TableFilterDate;
	$: key = config.key;
	let currentValue: Date | undefined;

	const updateFilterDate = (newFilter: Date) => {
		if (newFilter !== currentValue) {
			currentValue = newFilter;
		}
	};

	$: dateDebounced(currentValue);
	$: updateFilterDate(get($tableContext.filter, key));

	// @ts-expect-error Value can actually be a string
	$: if (currentValue === '') currentValue = undefined;
</script>

<input bind:value={currentValue} type="date" class="border p-1 font-normal outline-none" />

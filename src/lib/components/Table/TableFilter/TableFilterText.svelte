<script lang="ts">
	import { debounce, get, set } from 'lodash-es';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	import { TableContextKey } from './../TableStores';
	import type { TableContextType } from './../TableStores';
	import type { TableFilterString } from './../TableTypes';

	const tableContext = getContext<Writable<TableContextType>>(TableContextKey);

	const stringDebounced = debounce(
		(newString: string | undefined) =>
			($tableContext = set($tableContext, `filter.${key}`, newString)),
		500
	);
	export let config: TableFilterString;
	$: key = config.key;
	let currentString: string | undefined;

	const updateFilterString = (newFilter: string) => {
		if (newFilter !== currentString) {
			currentString = newFilter;
		}
	};

	$: stringDebounced(currentString);
	$: updateFilterString(get($tableContext.filter, key));
	$: if (currentString === '') currentString = undefined;
</script>

<input
	bind:value={currentString}
	type="search"
	placeholder="Filter Text..."
	class="border p-1 font-normal outline-none" />

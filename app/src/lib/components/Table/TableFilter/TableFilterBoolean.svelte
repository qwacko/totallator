<script lang="ts">
	import { debounce, get, set } from 'lodash-es';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	import { TableContextKey } from './../TableStores';
	import type { TableContextType } from './../TableStores';
	import type { TableFilterBoolean } from './../TableTypes';

	const tableContext = getContext<Writable<TableContextType>>(TableContextKey);

	const stringDebounced = debounce(
		(newValue: boolean | undefined) =>
			($tableContext = set($tableContext, `filter.${key}`, newValue)),
		500
	);
	export let config: TableFilterBoolean;
	$: key = config.key;
	let currentValue: boolean | undefined;

	const updateFilterString = (newFilter: boolean | undefined) => {
		if (newFilter !== currentValue) {
			currentValue = newFilter;
		}
	};

	$: stringDebounced(currentValue);
	$: updateFilterString(get($tableContext.filter, key));
</script>

<div class="flex w-full flex-row pt-2 text-xs">
	<button
		class="boolButton"
		class:boolButtonSelected={currentValue === true}
		on:click={() => (currentValue === true ? (currentValue = undefined) : (currentValue = true))}
		>{config.onTitle || 'True'}</button>
	<button
		class="boolButton"
		class:boolButtonSelected={currentValue === false}
		on:click={() => (currentValue === false ? (currentValue = undefined) : (currentValue = false))}
		>{config.offTitle || 'False'}</button>
</div>

<style lang="postcss">
	.boolButton {
		@apply flex w-1/2 place-content-center whitespace-nowrap border-y border-l border-gray-400;
		@apply bg-gray-100 p-2 text-center text-xs font-thin text-gray-400 first:rounded-l-sm last:rounded-r-sm last:border-r;
	}

	.boolButtonSelected {
		@apply bg-gray-400 text-gray-100;
	}
</style>

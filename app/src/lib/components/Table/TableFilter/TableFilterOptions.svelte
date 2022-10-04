<script lang="ts">
	import { debounce, get, set } from 'lodash-es';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	import { TableContextKey } from './../TableStores';
	import type { TableContextType } from './../TableStores';
	import type { TableFilterOptionsType } from './../TableTypes';

	const tableContext = getContext<Writable<TableContextType>>(TableContextKey);

	const stringDebounced = debounce(
		(newValue: string[] | undefined) =>
			($tableContext = set($tableContext, `filter.${key}`, newValue)),
		1
	);
	export let config: TableFilterOptionsType;
	$: key = config.key;
	let currentValue: string[] | undefined;

	const updateFilterOptions = (newFilter: string[] | undefined) => {
		if (newFilter !== currentValue) {
			currentValue = newFilter;
		}
	};

	const toggleOption = (value: string) => {
		if (!currentValue) {
			currentValue = [value];
		} else if (currentValue.includes(value)) {
			if (currentValue.length === 1) {
				currentValue = undefined;
			} else {
				currentValue = currentValue.filter((item) => item !== value);
			}
		} else {
			currentValue = [...currentValue, value].sort((a, b) => a.localeCompare(b));
		}
	};

	$: stringDebounced(currentValue);
	$: updateFilterOptions(get($tableContext.filter, key));
</script>

<div class="flex w-full flex-row pt-2 text-xs">
	{#each config.options as option}
		<button
			class="boolButton"
			class:boolButtonSelected={currentValue ? currentValue.includes(option.value) : false}
			on:click={() => toggleOption(option.value)}>{option.title}</button>
	{/each}
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

<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import type { SelectOptionType } from './Select';

	const dispatch = createEventDispatcher();

	export let options: SelectOptionType = [];
	export let value: string;
	export let name: string;
	export let id: string;
	export let placeholder: string;
	export let displayType: 'default' = 'default' as const;
	export let errorMessage: string | undefined = undefined;
	export let loading = false;

	const onKeyPress = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			dispatch('enter', e);
		}
		if (e.key === 'Escape') {
			dispatch('escape', e);
		}
	};

	$: errorPresent = errorMessage ? true : false;
</script>

<select
	{name}
	{id}
	{placeholder}
	bind:value
	disabled={loading}
	class="flex"
	class:animate-pulse={loading}
	class:default={displayType === 'default' && !errorPresent}
	class:defaultError={displayType === 'default' && errorPresent}
	on:click
	on:blur
	on:select
	on:change
	on:keypress={onKeyPress}>
	{#each options as currentOption}
		<option value={currentOption.value} label={currentOption.label} />
	{/each}
</select>

<style lang="postcss">
	select.default {
		@apply flex rounded-md border border-blue-200 p-2 outline-none hover:bg-blue-50 focus:bg-blue-50;
	}

	select.defaultError {
		@apply flex rounded-md border border-red-500 bg-red-50 p-2 outline-none hover:bg-white focus:bg-white;
	}
</style>

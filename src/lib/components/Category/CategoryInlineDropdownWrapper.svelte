<script lang="ts">
	import type { CategorySelectInfo } from '../Table/TableTypes';
	import CategoryInlineDisplay from './CategoryInlineDisplay.svelte';
	import CategoryInlineDropdown from './CategoryInlineDropdown.svelte';

	export let value: CategorySelectInfo[] | undefined;
	export let accountGrouping: string;
	export let disabled = false;
	export let loading = false;
	export let textCenter = false;
	export let ring = false;
	export let noDisabled = false;
	export let id: string;
	export let clearable = false;
</script>

{#if value}
	{#if value.length === 0}
		<div>No Categories</div>
	{:else if value.length === 1}
		<CategoryInlineDropdown
			value={value[0]}
			{accountGrouping}
			{disabled}
			{loading}
			{textCenter}
			{ring}
			{noDisabled}
			{id}
			{clearable}
			on:update />
	{:else}
		<div class="flex flex-col">
			{#each value as currentAccount}
				<CategoryInlineDisplay value={currentAccount} />
			{/each}
		</div>
	{/if}
{/if}

<script lang="ts">
	import type { TagSelectInfo } from '../Table/TableTypes';
	import TagInlineDisplay from './TagInlineDisplay.svelte';
	import TagInlineDropdown from './TagInlineDropdown.svelte';

	export let value: TagSelectInfo[] | undefined;
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
		<div>No Tags</div>
	{:else if value.length === 1}
		<TagInlineDropdown
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
				<TagInlineDisplay value={currentAccount} />
			{/each}
		</div>
	{/if}
{/if}

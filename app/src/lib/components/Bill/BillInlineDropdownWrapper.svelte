<script lang="ts">
	import type { BillSelectInfo } from '../Table/TableTypes';
	import BillInlineDisplay from './BillInlineDisplay.svelte';
	import BillInlineDropdown from './BillInlineDropdown.svelte';

	export let value: BillSelectInfo[] | undefined;
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
		<div>No Bills</div>
	{:else if value.length === 1}
		<BillInlineDropdown
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
				<BillInlineDisplay value={currentAccount} />
			{/each}
		</div>
	{/if}
{/if}

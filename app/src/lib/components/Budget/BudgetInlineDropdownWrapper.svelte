<script lang="ts">
	import type { BudgetSelectInfo } from '../Table/TableTypes';
	import BudgetInlineDisplay from './BudgetInlineDisplay.svelte';
	import BudgetInlineDropdown from './BudgetInlineDropdown.svelte';

	export let value: BudgetSelectInfo[] | undefined;
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
		<div>No Budgets</div>
	{:else if value.length === 1}
		<BudgetInlineDropdown
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
				<BudgetInlineDisplay value={currentAccount} />
			{/each}
		</div>
	{/if}
{/if}

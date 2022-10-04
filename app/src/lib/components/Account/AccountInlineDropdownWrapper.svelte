<script lang="ts">
	import type { AccountSelectInfo } from '../Table/TableTypes';
	import AccountInlineDisplay from './AccountInlineDisplay.svelte';
	import AccountInlineDropdown from './AccountInlineDropdown.svelte';

	export let value: AccountSelectInfo[] | undefined;
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
		<div>No Accounts</div>
	{:else if value.length === 1}
		<AccountInlineDropdown
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
				<AccountInlineDisplay value={currentAccount} />
			{/each}
		</div>
	{/if}
{/if}

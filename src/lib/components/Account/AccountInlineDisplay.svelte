<script lang="ts">
	import type { AccountSelectInfo } from '../Table/TableTypes';

	export let value: AccountSelectInfo | undefined;
</script>

{#if value}
	{#if value.id === 'Blank'}
		<div class="flex flex-row gap-1 text-gray-400">
			{value?.title}
		</div>
	{:else}
		<div class="flex flex-row gap-1">
			<div class="combinedTitle flex">
				{value.type}
			</div>
			{#if value.type === 'Asset' || value.type === 'Liability'}
				<div class="combinedTitle flex">-</div>
				<div class="combinedTitle flex">
					{value.accountTitleCombined.replace(`/${value.title}`, '')}
				</div>
			{/if}
		</div>
		<div class="flex">
			{value?.title}
		</div>
	{/if}
{/if}

<style lang="postcss">
	.combinedTitle {
		font-size: 0.5rem; /* 12px */
		line-height: 0.6rem; /* 16px */
	}
</style>

<script lang="ts">
	import type { BillSelectInfo } from '../Table/TableTypes';

	export let value: BillSelectInfo | undefined;
</script>

{#if value}
	{#if value.id === 'Blank'}
		<div class="flex  text-gray-400">
			{value?.title}
		</div>
	{:else}
		<div class="flex">
			{value?.title}
		</div>
	{/if}
{/if}

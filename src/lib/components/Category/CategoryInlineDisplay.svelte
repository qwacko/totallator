<script lang="ts">
	import type { CategorySelectInfo } from '../Table/TableTypes';

	export let value: CategorySelectInfo | undefined;
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

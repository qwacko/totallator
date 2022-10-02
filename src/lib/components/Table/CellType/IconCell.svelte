<script lang="ts">
	import Icon from '@iconify/svelte';
	import { createEventDispatcher } from 'svelte';

	import type { IconCellValues } from '../TableTypes';

	const dispatch = createEventDispatcher();

	export let data: IconCellValues | undefined;
</script>

<div class="flex flex-row gap-0">
	{#if data}
		{#if data.complete}
			<button
				disabled={data.complete === 'icon'}
				class:activeGreen={data.completeValue}
				class:inactiveGreen={!data.completeValue}
				class="tooltip"
				data-tip={data.completeValue ? 'Complete' : 'Not Complete'}
				on:click={() => data && dispatch('completeButton', !data.completeValue)}>
				<Icon icon="teenyicons:file-tick-solid" class="iconSize" />
			</button>
		{/if}
		{#if data.dataChecked}
			<button
				disabled={data.dataChecked === 'icon'}
				class:activeGreen={data.dataCheckedValue}
				class:inactiveGreen={!data.dataCheckedValue}
				class="tooltip"
				data-tip={data.dataCheckedValue ? 'Data Checked' : 'Not Data Checked'}
				on:click={() => data && dispatch('dataCheckedButton', !data.dataCheckedValue)}
				><Icon icon="ic:sharp-fact-check" class="iconSize" /></button>
		{/if}
		{#if data.reconciled}
			<button
				disabled={data.reconciled === 'icon'}
				class:activeGreen={data.reconciledValue}
				class:inactiveGreen={!data.reconciledValue}
				class="tooltip"
				data-tip={data.reconciledValue ? 'Reconciled' : 'Not Reconciled'}
				on:click={() => data && dispatch('reconciledButton', !data.reconciledValue)}
				><Icon icon="ant-design:file-sync-outlined" class="iconSize" /></button>
		{/if}
		{#if data.linked}
			<button
				disabled={data.linked === 'icon'}
				class:activeBlue={data.linkedValue}
				class:inactiveBlue={!data.linkedValue}
				class="tooltip"
				data-tip={data.linkedValue ? 'Linked' : 'Not Linked'}
				on:click={() => data && dispatch('linkedButton', !data.linkedValue)}>
				<Icon icon="jam:link" class=" iconSize" />
			</button>
		{/if}

		{#if data.primary}
			<button
				disabled={data.primary === 'icon'}
				class:activeBlue={data.primaryValue}
				class:inactiveBlue={!data.primaryValue}
				class="tooltip"
				data-tip={data.primaryValue ? 'Primary' : 'Not Primary'}
				on:click={() => data && dispatch('primaryButton', !data.primaryValue)}>
				<Icon icon="gg:crown" class="iconSize" />
			</button>
		{/if}
		{#if data.deleted && data.deletedValue}
			<button
				disabled={data.deleted === 'icon'}
				on:click={() => data && dispatch('deleteButton', !data.deletedValue)}
				><Icon icon="ep:delete-filled" class="iconSize text-red-500" /></button>
		{/if}
		{#if data.disabled && data.disabledValue}
			<button
				disabled={data.disabled === 'icon'}
				on:click={() => data && dispatch('disabledButton', !data.disabledValue)}
				><Icon icon="fa:lock" class="iconSize text-red-500" /></button>
		{/if}
	{/if}
</div>

<style lang="postcss">
	button {
		@apply border-y border-l border-gray-300 p-1 outline-none first:rounded-l-md last:rounded-r-md last:border-r;
	}

	.activeGreen {
		@apply bg-green-400 text-white;
	}

	.inactiveGreen {
		@apply bg-transparent text-gray-300;
	}

	.activeGreen:enabled {
		@apply ring-green-600 hover:ring-2 focus:ring-2;
	}

	.inactiveGreen:enabled {
		@apply text-green-400 ring-green-600 hover:bg-green-200 hover:ring-2 focus:ring-2;
	}

	.activeBlue {
		@apply bg-blue-400 text-white;
	}

	.inactiveBlue {
		@apply bg-transparent text-gray-300;
	}

	.activeBlue:enabled {
		@apply ring-blue-600 hover:ring-2 focus:ring-2;
	}

	.inactiveBlue:enabled {
		@apply text-blue-400 ring-blue-600 hover:bg-blue-200 hover:ring-2 focus:ring-2;
	}
</style>

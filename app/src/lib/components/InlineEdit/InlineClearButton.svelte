<script lang="ts">
	import Icon from '@iconify/svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let clearable = false;
	export let hasValue = false;
</script>

<div class="flex w-full flex-row gap-2">
	<div class="flex flex-grow">
		<slot />
	</div>
	{#if clearable}
		<button
			class="flex items-center rounded-md  px-2 {hasValue
				? 'hover:bg-blue-400 bg-blue-600 border-blue-600 border'
				: 'border-gray-200'} "
			disabled={!hasValue}
			on:click={() => dispatch('clear')}>
			<Icon
				icon="heroicons:x-mark"
				class="flex {hasValue ? 'text-white' : 'text-gray-600'}"
				width="15" />
		</button>
	{/if}
</div>

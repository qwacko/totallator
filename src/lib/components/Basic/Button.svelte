<script lang="ts">
	import InlineSpinner from './InlineSpinner.svelte';

	export let loading = false;
	export let defaultText = 'Button';
	export let loadingText = 'Loading...';
	export let disabled = false;

	export let displayType: 'default' = 'default';
	export let type: 'submit' | 'reset' | 'button' = 'button';
</script>

<button
	{type}
	class={$$props.class}
	{disabled}
	class:default={displayType === 'default'}
	on:click
	on:focus
	on:blur
	on:dblclick
	on:mouseover
	on:mouseenter
	on:mouseleave>
	<div class="flex flex-row items-center gap-2 ">
		{#if loading}
			<InlineSpinner colour="white" hidden={false} size="md" />
		{/if}
		<div class="flex truncate text-center font-bold">
			{#if loading}{loadingText}{:else}{defaultText}{/if}
		</div>
	</div>
</button>

<style lang="postcss">
	button {
		@apply flex justify-center rounded-md border p-2;
	}

	.default:enabled {
		@apply border-blue-200 bg-blue-100 stroke-blue-800  hover:border-blue-800 hover:bg-blue-500 hover:stroke-white hover:text-white;
	}

	.default:disabled {
		@apply border-gray-200 bg-gray-100 stroke-gray-800;
	}
</style>

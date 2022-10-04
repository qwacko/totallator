<script lang="ts">
	import type { ButtonsOptions } from './ButtonsOptions';
	import InlineSpinner from './InlineSpinner.svelte';

	export let options: ButtonsOptions = [];
	export let loading: boolean = false;
	export let disabled: boolean = false;
</script>

<div class={$$props.class}>
	<div class="flex w-full flex-row gap-0 p-1">
		{#each options as currentOption}
			<button
				type="button"
				disabled={currentOption.selected || loading || disabled}
				on:click={() => currentOption.onClick && currentOption.onClick()}
				class="flex flex-grow place-content-center border border-r-0 p-1 text-sm first:rounded-l-md last:rounded-r-md last:border-r"
				class:selected={currentOption.selected}
				class:unselected={!currentOption.selected}
				class:blue={currentOption.colour ? currentOption.colour === 'blue' : true}
				class:red={currentOption.colour ? currentOption.colour === 'red' : false}
				class:white={currentOption.colour ? currentOption.colour === 'white' : false}>
				<div class="flex flex-row items-center gap-1">
					<div class="flex">{currentOption.label}</div>
					{#if currentOption.selected && loading}
						<InlineSpinner size="sm" colour="white" />
					{/if}
				</div>
			</button>
		{/each}
	</div>
</div>

<style lang="postcss">
	.selected {
		@apply outline-none focus:ring-2;
	}

	.unselected {
		@apply outline-none focus:ring-2;
	}

	.selected.blue {
		@apply border-blue-800 bg-blue-500 text-white;
	}
	.selected.red {
		@apply bg-red-500 text-white;
	}
	.selected.white {
		@apply bg-white text-blue-200;
	}

	.unselected.blue {
		@apply border-blue-200 bg-transparent text-blue-800 hover:bg-blue-200;
	}

	.unselected.red {
		@apply border-red-200 bg-transparent text-red-600 hover:bg-red-200;
	}

	.unselected.white {
		@apply border-white bg-transparent text-white hover:bg-blue-200;
	}
</style>

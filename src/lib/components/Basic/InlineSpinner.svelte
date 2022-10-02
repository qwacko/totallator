<script lang="ts">
	export let hidden = false;
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let colour: 'blue' | 'white' = 'blue';
</script>

<div
	class="flex rounded-full"
	class:small={size === 'sm'}
	class:medium={size === 'md'}
	class:large={size === 'lg'}
	class:hiddenItem={hidden}
	class:shown={!hidden}
	class:blue={colour === 'blue'}
	class:white={colour === 'white'} />

<style lang="postcss">
	div.small {
		@apply h-3 w-3 border-2;
	}

	div.medium {
		@apply h-5 w-5 border-2;
	}

	div.large {
		@apply h-8 w-8 border-4;
	}

	div.hiddenItem {
		@apply border border-transparent;
	}

	div.shown {
		@apply animate-spin;
	}

	div.shown.blue {
		@apply border-r-transparent border-b-transparent border-r-blue-500 border-b-blue-500;
	}

	div.shown.white {
		@apply border-r-transparent border-b-transparent border-r-white border-b-white;
	}
</style>

<script lang="ts">
	export let size: 'sm' | 'md' | 'lg' = 'md';
</script>

<div
	class="flex"
	class:small={size === 'sm'}
	class:medium={size === 'md'}
	class:large={size === 'lg'}
	on:click>
	<svg
		class="h-6 w-6"
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
		aria-hidden="true">
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d="M6 18L18 6M6 6l12 12" />
	</svg>
</div>

<style lang="postcss">
	div {
		@apply cursor-pointer items-center justify-center rounded-full p-1 text-center text-gray-400 hover:bg-gray-100;
	}
	div.small {
		@apply h-3 w-3 text-xs;
	}

	div.medium {
		@apply h-5 w-5 text-base;
	}

	div.large {
		@apply h-8 w-8 text-lg;
	}
</style>

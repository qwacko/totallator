<script lang="ts">
	export let disabled = false;
</script>

<div
	class=" flex flex-grow rounded-md border focus-within:bg-blue-100 focus:bg-blue-100"
	class:disabled>
	<slot />
</div>

<style lang="postcss">
	.disabled {
		@apply bg-gray-100;
	}
</style>

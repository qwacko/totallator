<script lang="ts">
	import { clickOutside } from '$lib/utils/clickOutside';
	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';

	import ClearButton from '../Basic/ClearButton.svelte';
	import InlineSpinner from '../Basic/InlineSpinner.svelte';

	const dispatch = createEventDispatcher();

	export let disabled = false;
	export let loading = false;
	export let textCenter = false;
	export let ring = false;
	export let noDisabled = false;
	export let id: string;
	export let clearable = false;
	export let dropdownOpen = false;
	let selected = false;

	const onKeyPress = (e: KeyboardEvent) => {
		if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
			e.preventDefault();
			dropdownOpen = true;
		}
	};
</script>

<div
	class="{$$props.class} relative "
	class:selected={selected && !disabled && !loading}
	class:unselected={!selected || disabled || loading}
	class:ring
	use:clickOutside
	on:click_outside={() => (dropdownOpen = false)}>
	<div
		class="flex w-full flex-col p-2"
		on:click={() => (disabled ? undefined : (dropdownOpen = true))}>
		<div class="flex w-full flex-row items-center">
			{#if textCenter}
				<InlineSpinner hidden={true} size="md" />
			{/if}
			<div
				{id}
				class="flex flex-grow flex-col outline-none {textCenter ? 'text-center' : 'text-left'}"
				class:disabled={(disabled || loading) && !noDisabled}
				disabled={(disabled || loading) && !noDisabled}
				on:keydown={onKeyPress}
				on:focus={() => (selected = true)}
				tabindex={disabled ? undefined : 0}>
				<slot name="mainContent" />
			</div>

			{#if !loading && clearable}
				<ClearButton on:click={() => dispatch('clear')} size="md" />
			{:else}
				<InlineSpinner hidden={!loading} size="md" />
			{/if}
		</div>
	</div>
	{#if dropdownOpen}
		<div
			class="absolute z-10 flex flex-col rounded-sm bg-white  shadow-lg "
			transition:slide={{ duration: 100 }}>
			<slot name="dropdownContent" />
		</div>
	{/if}
</div>

<style lang="postcss">
	.selected.ring {
		@apply bg-blue-100 ring-2;
	}

	.selected {
		@apply w-full  rounded-none outline-none;
	}

	.unselected {
		@apply w-full rounded-none bg-transparent outline-none;
	}
</style>

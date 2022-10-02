<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import ClearButton from '../Basic/ClearButton.svelte';
	import InlineSpinner from '../Basic/InlineSpinner.svelte';

	const dispatch = createEventDispatcher();

	export let value: boolean | undefined | null;
	export let disabled: boolean = false;
	export let loading: boolean = false;
	export let ring: boolean = false;
	export let noDisabled: boolean = false;
	export let id: string;
	export let updateTime: Date;
	let currentValue: boolean | undefined | null;

	const updatedCurrentValue = (newValue: boolean | undefined | null) => {
		currentValue = newValue;
	};
	$: updateTime && updatedCurrentValue(value);

	let selected = false;

	const onKeyPress = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			if (value !== currentValue) {
				// dispatch('enterOrBlur', currentValue);
			}
		}
		if (e.key === 'Escape') {
			currentValue = value;
		}
		if (e.key === 'ArrowUp') {
			dispatch('ArrowDown');
		}
		if (e.key === 'ArrowDown') {
			dispatch('ArrowDown');
		}
	};

	const change = (
		e: Event & {
			currentTarget: EventTarget & HTMLInputElement;
		}
	) => {
		const target = e.target as HTMLInputElement;
		if (target) {
			dispatch('enterOrBlur', target.checked);
		}
	};
</script>

<div
	class={$$props.class}
	class:selected={selected && !disabled && !loading}
	class:unselected={!selected || disabled || loading}
	class:ring>
	<div class="flex w-full flex-row items-center justify-center gap-1 p-1">
		<input
			{id}
			type="checkbox"
			bind:checked={currentValue}
			class="flex"
			class:disabled={(disabled || loading) && !noDisabled}
			{disabled}
			on:change={change}
			on:focus={() => {
				selected = true;
			}}
			on:blur={() => {
				selected = false;
			}}
			on:keydown={onKeyPress} />
		{#if loading}
			<InlineSpinner hidden={!loading} size="md" />
		{/if}
	</div>
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

	input {
		@apply bg-transparent accent-blue-600 outline-none;
	}

	input.disabled {
		@apply text-gray-400;
	}
</style>

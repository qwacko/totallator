<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import ClearButton from '../Basic/ClearButton.svelte';
	import InlineSpinner from '../Basic/InlineSpinner.svelte';

	const dispatch = createEventDispatcher();

	export let value: string | undefined | null = '';
	export let options: { value: string; label: string }[] = [];
	export let disabled: boolean = false;
	export let loading: boolean = false;
	export let textCenter: boolean = false;
	export let ring: boolean = false;
	export let noDisabled: boolean = false;
	export let id: string;
	export let clearable: boolean = false;
	export let updateTime: Date;
	let currentValue: string | undefined | null;

	const updatedCurrentValue = (newValue: string | undefined | null) => {
		currentValue = newValue;
	};
	$: updateTime && updatedCurrentValue(value);

	let selected = false;

	const onKeyPress = (e: KeyboardEvent) => {
		//Enter isn't included, as it is used to manipulate the selection.
		//Only blur will update the value

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
</script>

<div
	class={$$props.class}
	class:selected={selected && !disabled && !loading}
	class:unselected={!selected || disabled || loading}
	class:ring>
	<div class="flex w-full flex-row items-center gap-2 p-1">
		<select
			{id}
			bind:value={currentValue}
			class="flex flex-grow {textCenter ? 'text-center' : 'text-left'}"
			class:disabled={(disabled || loading) && !noDisabled}
			disabled={disabled || loading}
			on:focus={() => {
				selected = true;
			}}
			on:blur={() => {
				selected = false;
				if (currentValue !== value) {
					dispatch('enterOrBlur', currentValue);
				}
			}}
			on:keydown={onKeyPress}>
			{#each options as option}
				<option value={option.value}>{option.label}</option>
			{/each}
		</select>

		{#if !loading && clearable && value}
			<ClearButton on:click={() => dispatch('enterOrBlur', null)} size="md" />
		{:else}
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

	select {
		@apply bg-transparent outline-none;
	}

	select.disabled {
		@apply text-gray-400;
	}
</style>

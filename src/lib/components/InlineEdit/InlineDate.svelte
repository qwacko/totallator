<script lang="ts">
	import { getUserData } from '$lib/graphqlClient/frontendHelpers/getUserData';
	import { dateFormats } from '$lib/utils/dateFormats';
	import { getContextClient } from '@urql/svelte';
	import { format } from 'date-fns';
	import { createEventDispatcher } from 'svelte';

	import ClearButton from '../Basic/ClearButton.svelte';
	import InlineSpinner from '../Basic/InlineSpinner.svelte';

	const dispatch = createEventDispatcher();

	export let value: string | undefined | null = '';
	export let disabled = false;
	export let loading = false;
	export let ring = false;
	export let noDisabled = false;
	export let id: string;
	export let clearable = false;
	export let updateTime: Date;
	let currentValue: string | undefined | null;

	const updatedCurrentValue = (newValue: string | undefined | null) => {
		currentValue = newValue;
	};
	$: updateTime && updatedCurrentValue(value);

	let selected = false;
	let input: HTMLElement;

	const onKeyPress = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			if (value !== currentValue) {
				dispatch('enterOrBlur', currentValue);
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

	const client = getContextClient();
	const userConfig = getUserData(client);
	$: dateFormat = $userConfig?.data?.user?.dateFormat
		? dateFormats.find((item) => item.dbValue === $userConfig?.data?.user?.dateFormat)?.dateFnFormat
		: 'yyyy-MM-dd';
</script>

<div
	class={$$props.class}
	class:selected={selected && !disabled && !loading}
	class:unselected={!selected || disabled || loading}
	class:ring
	on:click={() => {
		if (!selected) {
			input.focus();
		}
	}}>
	<div class="flex w-full flex-row items-center gap-2 p-1">
		<input
			bind:this={input}
			{id}
			type="date"
			bind:value={currentValue}
			class="flex flex-grow {selected ? '' : 'h-0 w-0 '}"
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
			on:keydown={onKeyPress} />

		{#if value && !selected}
			<div class="flex cursor-pointer" on:click={() => input.focus()}>
				{format(new Date(value), dateFormat || 'yyyy-MM-dd')}
			</div>
		{/if}
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
		@apply rounded-none outline-none;
	}

	.unselected {
		@apply rounded-none bg-transparent outline-none;
	}

	input {
		@apply bg-transparent outline-none;
	}

	input.disabled {
		@apply text-gray-400;
	}
</style>

<script lang="ts">
	import { getUserData } from '$lib/graphqlClient/frontendHelpers/getUserData';
	import type { CurrencyFormatEnum } from '$lib/graphqlServer/types/generated-resolvers';
	import { getContextClient } from '@urql/svelte';
	import { createEventDispatcher } from 'svelte';

	import ClearButton from '../Basic/ClearButton.svelte';
	import InlineSpinner from '../Basic/InlineSpinner.svelte';

	const dispatch = createEventDispatcher();
	const client = getContextClient();
	const userConfig = getUserData(client);

	export let value: number | undefined | null = null;
	export let disabled = false;
	export let loading = false;
	export let textCenter = false;
	export let ring = false;
	export let noDisabled = false;
	export let id: string;
	export let clearable = false;
	export let updateTime: Date;
	export let placeholder = 'Amount';
	let currentValue: number | undefined | null;
	let displayedValue: string | undefined | null;
	let timer = setTimeout(() => undefined, 0);
	let currencyFormat: CurrencyFormatEnum = 'USD';

	$: currencyFormat = $userConfig.data?.user?.currencyFormat || 'USD';

	let numberFormat: Intl.NumberFormat = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD'
	});

	$: if (currencyFormat === 'USD') {
		numberFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
	} else if (currencyFormat === 'EUR') {
		numberFormat = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' });
	} else if (currencyFormat === 'GBP') {
		numberFormat = new Intl.NumberFormat('en-UK', { style: 'currency', currency: 'GBP' });
	} else if (currencyFormat === 'JPY') {
		numberFormat = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' });
	}

	const updateDisplayedValue = (newValue: number | undefined | null) => {
		if (newValue === undefined || newValue === null) {
			displayedValue = null;
			currentValue = null;
		} else {
			displayedValue = numberFormat.format(newValue || 0);
			currentValue = newValue;
		}
	};

	$: updateTime && updateDisplayedValue(value);

	const extractValue = (input: string) => {
		const newValue =
			currencyFormat === 'EUR'
				? parseFloat(
						input
							.replace(/\./g, '')
							.replace(/,/g, '.')
							.replace(/[^-0-9.]/, '')
							.valueOf()
				  )
				: parseFloat(
						input
							.replace(/,/g, '')
							.replace(/[^-0-9.]/g, '')
							.valueOf()
				  );

		return newValue;
	};

	const inputValueChanged = (e: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
		const val = extractValue(e.currentTarget.value);
		if (timer) {
			clearTimeout(timer);
		}
		timer = setTimeout(() => {
			updateDisplayedValue(val);
		}, 750);
	};

	let selected = false;

	const onKeyPress = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			const newValue = extractValue(e.currentTarget.value as string);
			updateDisplayedValue(newValue);
			if (value !== newValue && e.currentTarget.value !== '') {
				dispatch('enterOrBlur', newValue);
			}
		}
		if (e.key === 'Escape') {
			updateDisplayedValue(value);
		}
		if (e.key === 'ArrowUp') {
			dispatch('ArrowUp');
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
	<div class="flex w-full flex-row items-center p-2">
		{#if textCenter}<InlineSpinner hidden={true} size="md" />
		{/if}
		<input
			{id}
			type="text"
			value={displayedValue}
			on:input={inputValueChanged}
			{placeholder}
			class="flex flex-grow {displayedValue === null
				? 'text-left'
				: textCenter
				? 'text-center'
				: 'text-right'}"
			class:font-semibold={displayedValue !== null}
			class:disabled={(disabled || loading) && !noDisabled}
			class:negativeValue={(currentValue || 0) < 0}
			disabled={disabled || loading}
			on:focus={() => {
				selected = true;
			}}
			on:blur={(e) => {
				const newValue = extractValue(e.currentTarget.value);
				selected = false;
				if (newValue !== value && e.currentTarget.value !== '') {
					dispatch('enterOrBlur', newValue);
				}
			}}
			on:keydown={onKeyPress} />

		{#if !loading && clearable && value}
			<ClearButton on:click={() => dispatch('enterOrBlur', null)} size="md" />
		{:else}
			<InlineSpinner hidden={!loading} size="md" />
		{/if}
	</div>
</div>

<style lang="postcss">
	.negativeValue {
		@apply text-red-400;
	}

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
		@apply bg-transparent outline-none;
	}

	input.disabled {
		@apply text-gray-400;
	}
</style>

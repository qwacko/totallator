<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let value: svelte.JSX.HTMLAttributes<HTMLInputElement>['value'];
	export let name: svelte.JSX.HTMLAttributes<HTMLInputElement>['name'];
	export let placeholder: svelte.JSX.HTMLAttributes<HTMLInputElement>['placeholder'];
	export let id: svelte.JSX.HTMLAttributes<HTMLInputElement>['id'];
	export let type: 'email' | 'password' | 'text' | 'date' = 'text';
	export let displayType: 'default' = 'default';
	export let errorMessage: string | undefined = undefined;
	export let loading = false;
	export let disabled = false;

	const onBlur = (
		e: FocusEvent & {
			currentTarget: EventTarget & HTMLInputElement;
		}
	) => {
		dispatch('blur', e);
		dispatch('enterOrBlur', e);
	};

	const onKeyPress = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			dispatch('enter', e);
			dispatch('enterOrBlur', e);
		}
		if (e.key === 'Escape') {
			dispatch('escape', e);
		}
	};

	$: errorPresent = errorMessage ? true : false;
</script>

<div class="{$$props.class} flex flex-col">
	{#if type === 'email'}
		<input
			{placeholder}
			{id}
			{name}
			type="email"
			disabled={loading || disabled}
			class="flex"
			class:animate-pulse={loading}
			class:default={displayType === 'default' && !errorPresent}
			class:defaultError={displayType === 'default' && errorPresent}
			class:disabled
			class:notDisabled={!disabled}
			on:focus
			on:blur={onBlur}
			on:click
			on:change
			on:keydown={onKeyPress}
			bind:value />
	{:else if type === 'password'}
		<input
			{placeholder}
			{id}
			{name}
			type="password"
			disabled={loading || disabled}
			class="flex"
			class:animate-pulse={loading}
			class:default={displayType === 'default' && !errorPresent}
			class:defaultError={displayType === 'default' && errorPresent}
			class:disabled
			class:notDisabled={!disabled}
			on:focus
			on:blur={onBlur}
			on:click
			on:change
			on:keydown={onKeyPress}
			bind:value />
	{:else if type === 'date'}
		<input
			{placeholder}
			{id}
			{name}
			type="date"
			disabled={loading || disabled}
			class="flex"
			class:animate-pulse={loading}
			class:default={displayType === 'default' && !errorPresent}
			class:defaultError={displayType === 'default' && errorPresent}
			class:disabled
			class:notDisabled={!disabled}
			on:focus
			on:blur={onBlur}
			on:click
			on:change
			on:keydown={onKeyPress}
			bind:value />
	{:else}
		<input
			{placeholder}
			{id}
			{name}
			type="text"
			disabled={loading || disabled}
			class="flex"
			class:animate-pulse={loading}
			class:default={displayType === 'default' && !errorPresent}
			class:defaultError={displayType === 'default' && errorPresent}
			class:disabled
			class:notDisabled={!disabled}
			on:focus
			on:blur={onBlur}
			on:click
			on:change
			on:keydown={onKeyPress}
			bind:value />
	{/if}
	<div class="flex text-sm text-red-500" class:hidden={!errorPresent}>{errorMessage}</div>
</div>

<style lang="postcss">
	input.default {
		@apply flex rounded-md border border-blue-200 p-2 outline-none  focus:bg-blue-50;
	}

	input.defaultError {
		@apply flex rounded-md border border-red-500 bg-red-50 p-2 outline-none  focus:bg-white;
	}

	input.disabled {
		@apply bg-gray-100;
	}

	input.notDisabled {
		@apply hover:bg-blue-50;
	}
</style>

<script lang="ts">
	import { GetAccountGroupingsDocument } from '$lib/graphqlClient/generated';
	import { getContextClient, queryStore } from '@urql/svelte';

	export let value: string;
	export let loading = false;
	export let disabled = false;
	export let displayType: 'default' = 'default';
	export let errorMessage: string | undefined = undefined;
	export let name: svelte.JSX.HTMLAttributes<HTMLSelectElement>['name'];
	export let id: svelte.JSX.HTMLAttributes<HTMLSelectElement>['id'];
	$: errorPresent = errorMessage ? true : false;

	const client = getContextClient();
	const accountGroupings = queryStore({ client, query: GetAccountGroupingsDocument });

	$: accountGroupingsUse = $accountGroupings?.data?.accountGroupings
		? $accountGroupings.data.accountGroupings
				.filter((item) => (item.userIsAdmin && item.allowUpdate) || item.id === value)
				.sort((a, b) => a.title.toLocaleLowerCase().localeCompare(b.title.toLocaleLowerCase()))
		: [];

	$: onlySingleAccountGrouping = accountGroupingsUse.length === 1;
	const updateToOnly = () => {
		value = accountGroupingsUse[0].id;
	};
	$: if (onlySingleAccountGrouping) updateToOnly();
</script>

<div class="{$$props.class} flex flex-col">
	<select
		bind:value
		{id}
		{name}
		disabled={loading || disabled || onlySingleAccountGrouping}
		placeholder="Account Grouping"
		class="flex"
		class:animate-pulse={loading}
		class:placeholder={!value}
		class:default={displayType === 'default' && !errorPresent}
		class:defaultError={displayType === 'default' && errorPresent}
		class:multiple={!onlySingleAccountGrouping}>
		{#if !value}
			<option value="" selected={true} hidden={true} disabled={true}
				>Select Account Grouping</option>
		{/if}
		{#each accountGroupingsUse as currentAccountGrouping}
			<option
				class="text-black"
				value={currentAccountGrouping.id}
				selected={currentAccountGrouping.id === value}>{currentAccountGrouping.title}</option>
		{/each}
	</select>
	<div class="flex text-sm text-red-500" class:hidden={!errorPresent}>{errorMessage}</div>
</div>

<style lang="postcss">
	select {
		@apply disabled:bg-gray-100;
	}

	select.placeholder {
		@apply text-gray-400;
	}

	select.default {
		@apply flex rounded-md  border-blue-200 p-2 outline-none hover:bg-blue-50 focus:bg-blue-50;
	}

	select.defaultError {
		@apply flex rounded-md  border-red-500 bg-red-50 p-2 outline-none hover:bg-white focus:bg-white;
	}

	select > option {
		@apply bg-white;
	}

	select.multiple {
		@apply border;
	}
</style>

<script lang="ts">
	import AccountGroupingStatusInline from '$lib/components/AccountGrouping/AccountGroupingStatusInline.svelte';
	import AccountGroupingTitleInline from '$lib/components/AccountGrouping/AccountGroupingTitleInline.svelte';
	import AccountGroupingUserList from '$lib/components/AccountGrouping/AccountGroupingUserList.svelte';
	import Button from '$lib/components/Basic/Button.svelte';
	import InlineSpinner from '$lib/components/Basic/InlineSpinner.svelte';
	import Input from '$lib/components/Basic/Input.svelte';
	import PageHeading from '$lib/components/Basic/PageHeading.svelte';
	import toastsStore from '$lib/components/Toasts/toastsStore';
	import {
		createAccountGrouping,
		type createAccountGroupingResultStore
	} from '$lib/graphqlClient/frontendHelpers/createAccountGrouping';
	import { getContextClient } from '@urql/svelte';

	import { getAccountGroupings } from './getAccountGroupings';

	const client = getContextClient();
	let result: createAccountGroupingResultStore | null;
	$: loadingCreate = $result?.fetching || false;
	$: if ($result?.error)
		toastsStore.addToast({
			title: 'Error Adding Account Grouping',
			duration: 2000,
			style: 'filled',
			type: 'error',
			description: $result?.error.message
		});

	$: data = getAccountGroupings(client);

	let newTitle: string | null;
</script>

<div class="flex flex-col">
	<PageHeading>
		{#if $data.fetching}<InlineSpinner hidden={true} size="lg" />{/if}
		<div class="flex">Account Grouping</div>
		{#if $data.fetching}<InlineSpinner size="lg" />{/if}
	</PageHeading>
	<div
		class="grid grid-flow-row-dense grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
		<form
			on:submit|preventDefault={() =>
				createAccountGrouping({
					newTitle: newTitle || '',
					complete: () => (newTitle = null),
					client,
					setOperationResult: (value) => (result = value)
				})}>
			<div class="agBox flex h-full flex-col gap-2">
				<div class="flex w-full">
					<Input
						bind:value={newTitle}
						class="ring-3 w-full"
						id="newTitle"
						name="newTitle"
						placeholder="New Account Grouping Title" />
				</div>
				<div class="flex flex-grow" />
				<div class="flex w-full">
					<Button
						defaultText="New Account Grouping"
						class="ring-3 w-full"
						displayType="default"
						type="submit"
						loading={loadingCreate}
						loadingText="Creating Account Grouping..." />
				</div>
			</div>
		</form>
		{#if $data.data?.accountGroupings}
			{#each $data.data?.accountGroupings as ag}
				<div class="agBox flex flex-col items-center  gap-2">
					<AccountGroupingTitleInline
						id={ag.id}
						class="flex w-full text-lg font-bold"
						value={ag.title}
						disabled={!ag.userIsAdmin}
						textCenter={true}
						{ag} />
					<div class="flex text-xs font-bold {!ag.userIsAdmin ? 'text-gray-400' : "'"}">
						{#if ag.userIsAdmin}Admin Access{:else}View Access{/if}
					</div>
					<AccountGroupingStatusInline id={ag.id} {ag} class="flex w-full" value={ag.status} />
					<AccountGroupingUserList {ag} />
				</div>
			{/each}{/if}
	</div>
</div>

<style lang="postcss">
	.agBox {
		@apply rounded-md border p-4 shadow-lg;
	}
</style>

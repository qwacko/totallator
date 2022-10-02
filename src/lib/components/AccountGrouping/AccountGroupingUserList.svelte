<script lang="ts">
	import {
		type AddNewUserTOAGResultStore,
		addNewUserToAG
	} from '$lib/graphqlClient/frontendHelpers/addUserToAG';
	import type { GetAccountGroupingsQuery } from '$lib/graphqlClient/generated';
	import { getContextClient } from '@urql/svelte';

	import Button from '../Basic/Button.svelte';
	import Input from '../Basic/Input.svelte';
	import toastsStore from '../Toasts/toastsStore';
	import AccountGroupingUserButtons from './AccountGroupingUserButtons.svelte';

	export let ag: GetAccountGroupingsQuery['accountGroupings'][0];

	$: allUsers = [
		...(ag.adminUsers ? ag.adminUsers.map((item) => ({ ...item, admin: true })) : []),
		...(ag.viewUsers ? ag.viewUsers.map((item) => ({ ...item, admin: false })) : [])
	].sort((a, b) =>
		a.firstName && b.firstName
			? a.firstName?.toLocaleLowerCase().localeCompare(b.firstName?.toLocaleLowerCase())
			: 0
	);

	let addUser = false;
	let newUserEmail: string | null = null;

	const resetForm = () => {
		newUserLoading = false;
		newUserEmail = null;
		addUser = false;
	};

	const client = getContextClient();
	let result: AddNewUserTOAGResultStore | undefined;
	$: newUserLoading = $result?.fetching || false;
	$: Boolean($result?.data) && resetForm();
	$: if ($result?.error) {
		toastsStore.addToast({
			duration: 2000,
			style: 'filled',
			type: 'error',
			title: 'Error Adding User',
			description: $result.error.message
		});
	}
</script>

<div class="flex h-full w-full flex-col gap-1">
	{#each allUsers as currentUser}
		{#if currentUser}
			<div class="flex flex-row items-center gap-1">
				<div class="flex flex-grow flex-col gap-[0.5]">
					<div class="flex text-xs">
						{currentUser.firstName || currentUser.email}
						{currentUser.lastName || ''}
					</div>
					<div class="flex flex-grow text-xs">
						({currentUser.email})
					</div>
				</div>
				<AccountGroupingUserButtons {ag} user={currentUser} />
			</div>
		{/if}
	{/each}
	<div class="flex flex-grow" />
	<div class="flex flex-row gap-1">
		<Button
			class="flex text-sm "
			defaultText="Add User"
			type="button"
			displayType="default"
			on:click={() => (addUser = !addUser)} />
		{#if addUser}
			<Input
				class="flex flex-grow text-sm"
				id="newUser"
				name="NewUser"
				bind:value={newUserEmail}
				type="text"
				displayType="default"
				placeholder="New User Email"
				loading={newUserLoading}
				on:enter={() =>
					addNewUserToAG({
						ag,
						email: newUserEmail || '',
						client,
						setOperationResult: (val) => (result = val)
					})} />
		{/if}
	</div>
</div>

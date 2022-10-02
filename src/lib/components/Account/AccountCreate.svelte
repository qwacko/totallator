<script lang="ts">
	import Button from '$lib/components/Basic/Button.svelte';
	import Buttons from '$lib/components/Basic/Buttons.svelte';
	import type { ButtonsOptions } from '$lib/components/Basic/ButtonsOptions';
	import Input from '$lib/components/Basic/Input.svelte';
	import {
		AccountType,
		CreateAccountDocument,
		type CreateAccountInput,
		type CreateAccountMutation,
		type CreateAccountMutationVariables
	} from '$lib/graphqlClient/generated';
	import { getContextClient, mutationStore } from '@urql/svelte';
	import type { OperationResultStore } from '@urql/svelte/dist/types/common';
	import { createEventDispatcher } from 'svelte';
	import { z } from 'zod';

	import AccountGroupingSelect from '../AccountGrouping/AccountGroupingSelect.svelte';
	import toastsStore from '../Toasts/toastsStore';
	import { AccountCreateValidation } from './AccountCreateValidation';

	const dispatch = createEventDispatcher();

	let netWorthOptions: ButtonsOptions = [];
	let cashOptions: ButtonsOptions = [];
	let typeOptions: ButtonsOptions = [];
	let newAccount: Partial<CreateAccountInput> = {};
	let errors: Record<string, string> = {};

	let result:
		| OperationResultStore<CreateAccountMutation, CreateAccountMutationVariables>
		| undefined;
	$: newAccountLoading = $result?.fetching || false;
	$: if ($result?.error) {
		toastsStore.addToast({
			duration: 2000,
			style: 'filled',
			type: 'error',
			title: 'Account Creation Error',
			description: $result.error.message
		});
	}

	$: if ($result?.data) {
		dispatch('complete');
	}

	const client = getContextClient();
	const createAccountSubmit = async () => {
		const parsedAccount = AccountCreateValidation.safeParse(newAccount);

		if (!parsedAccount.success) {
			errors = parsedAccount.error.issues.reduce(
				(prev, current) => ({
					...prev,
					[current.path[0]]: current.message
				}),
				{}
			);

			parsedAccount.error.issues.forEach((item) =>
				toastsStore.addToast({
					duration: 2000,
					style: 'filled',
					type: 'error',
					title: item.path[0] as string,
					description: item.message
				})
			);
		} else {
			result = mutationStore({
				client,
				query: CreateAccountDocument,
				variables: { input: parsedAccount.data }
			});
		}
	};

	$: netWorthOptions = [
		{
			colour: 'blue',
			label: 'Is Net Worth',
			value: 'true',
			selected: newAccount.isNetWorth || newAccount.isNetWorth === undefined,
			onClick: () => {
				newAccount.isNetWorth = true;
			}
		},
		{
			colour: 'red',
			label: 'Is Not Net Worth',
			value: 'false',
			selected: !(newAccount.isNetWorth || newAccount.isNetWorth === undefined),
			onClick: () => {
				newAccount.isNetWorth = false;
			}
		}
	];
	$: cashOptions = [
		{
			colour: 'blue',
			label: 'Is Cash',
			value: 'true',
			selected: !(!newAccount.isCash || newAccount.isCash === undefined),
			onClick: () => {
				newAccount.isCash = true;
			}
		},
		{
			colour: 'red',
			label: 'Is Not Cash',
			value: 'false',
			selected: !newAccount.isCash || newAccount.isCash === undefined,
			onClick: () => {
				newAccount.isCash = false;
			}
		}
	];
	$: typeOptions = [
		{
			colour: 'blue',
			label: 'Income',
			value: 'true',
			selected: newAccount.type === AccountType.Income || false,
			onClick: () => (newAccount.type = AccountType.Income)
		},
		{
			colour: 'red',
			label: 'Expense',
			value: 'false',
			selected: newAccount.type === undefined ? true : newAccount.type === AccountType.Expense,
			onClick: () => (newAccount.type = AccountType.Expense)
		},
		{
			colour: 'blue',
			label: 'Asset',
			value: 'true',
			selected: newAccount.type === AccountType.Asset || false,
			onClick: () => (newAccount.type = AccountType.Asset)
		},
		{
			colour: 'red',
			label: 'Liability',
			value: 'false',
			selected: newAccount.type === AccountType.Liability || false,
			onClick: () => (newAccount.type = AccountType.Liability)
		}
	];
</script>

<form on:submit|preventDefault={createAccountSubmit}>
	<div class="flex w-80 flex-col gap-2 rounded-md ">
		<AccountGroupingSelect
			bind:value={newAccount.accountGroupingId}
			id="accountGrouping"
			name="Account Grouping"
			errorMessage={errors['accountGroupingId']} />
		<Input
			id="newAccountTitle"
			name="newAccountTitle"
			bind:value={newAccount.title}
			type="text"
			placeholder={`New ${newAccount.type || 'Expense'} Account Title`}
			disabled={newAccountLoading}
			errorMessage={errors['title']} />
		{#if newAccount.type === AccountType.Asset || newAccount.type === AccountType.Liability}
			<Input
				id="accountGroup"
				name="accountGroup"
				bind:value={newAccount.accountGroup}
				type="text"
				placeholder="Account Group"
				disabled={newAccountLoading}
				errorMessage={errors['accountGroup']} />
			<Input
				id="accountGroup2"
				name="accountGroup2"
				bind:value={newAccount.accountGroup2}
				type="text"
				placeholder="Account Group 2"
				disabled={newAccountLoading}
				errorMessage={errors['accountGroup2']} />
			<Input
				id="accountGroup3"
				name="accountGroup3"
				bind:value={newAccount.accountGroup3}
				type="text"
				placeholder="Account Group 3"
				disabled={newAccountLoading}
				errorMessage={errors['accountGroup3']} />
			<Buttons options={netWorthOptions} disabled={newAccountLoading} />
			<Buttons options={cashOptions} disabled={newAccountLoading} />
		{/if}
		<Buttons options={typeOptions} disabled={newAccountLoading} />
		<Button defaultText="Add Account" type="submit" loading={newAccountLoading} />
	</div>
</form>

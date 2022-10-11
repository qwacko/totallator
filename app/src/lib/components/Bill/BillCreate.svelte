<script lang="ts">
	import Button from '$lib/components/Basic/Button.svelte';
	import Input from '$lib/components/Basic/Input.svelte';
	import {
		CreateBillDocument,
		type CreateBillInput,
		type CreateBillMutation,
		type CreateBillMutationVariables,
		StatusEnum
	} from '$lib/graphqlClient/generated';
	import { getContextClient, mutationStore } from '@urql/svelte';
	import type { OperationResultStore } from '@urql/svelte/dist/types/common';
	import { createEventDispatcher } from 'svelte';
	import { z } from 'zod';

	import AccountGroupingSelect from '../AccountGrouping/AccountGroupingSelect.svelte';
	import toastsStore from '../Toasts/toastsStore';
	import { BillCreateValidation } from './BillCreateValidation';
	import { billTableRefreshTrigger } from './billStores';

	const dispatch = createEventDispatcher();

	let newBill: Partial<CreateBillInput> = {};
	let errors: Record<string, string> = {};

	let result: OperationResultStore<CreateBillMutation, CreateBillMutationVariables> | undefined;
	$: newBillLoading = $result?.fetching || false;
	$: if ($result?.error) {
		toastsStore.addToast({
			duration: 2000,
			style: 'filled',
			type: 'error',
			title: 'Bill Creation Error',
			description: $result.error.message
		});
	}

	$: if ($result?.data) {
		dispatch('complete');
		billTableRefreshTrigger.trigger();
	}

	const client = getContextClient();
	const createBillSubmit = async () => {
		const parsedBill = BillCreateValidation.safeParse(newBill);

		if (!parsedBill.success) {
			errors = parsedBill.error.issues.reduce(
				(prev, current) => ({
					...prev,
					[current.path[0]]: current.message
				}),
				{}
			);

			parsedBill.error.issues.forEach((item) =>
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
				query: CreateBillDocument,
				variables: { input: parsedBill.data }
			});
		}
	};
</script>

<form on:submit|preventDefault={createBillSubmit}>
	<div class="flex w-80 flex-col gap-2 rounded-md ">
		<AccountGroupingSelect
			bind:value={newBill.accountGroupingId}
			id="accountGrouping"
			name="Account Grouping"
			errorMessage={errors['accountGroupingId']} />
		<Input
			id="newTitle"
			name="newTitle"
			bind:value={newBill.title}
			type="text"
			placeholder={`New Title`}
			disabled={newBillLoading}
			errorMessage={errors['title']} />
		<Button defaultText="Add Category" type="submit" loading={newBillLoading} />
	</div>
</form>

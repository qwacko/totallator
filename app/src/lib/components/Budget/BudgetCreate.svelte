<script lang="ts">
	import Button from '$lib/components/Basic/Button.svelte';
	import Input from '$lib/components/Basic/Input.svelte';
	import {
		CreateBudgetDocument,
		type CreateBudgetInput,
		type CreateBudgetMutation,
		type CreateBudgetMutationVariables,
		StatusEnum
	} from '$lib/graphqlClient/generated';
	import { getContextClient, mutationStore } from '@urql/svelte';
	import type { OperationResultStore } from '@urql/svelte/dist/types/common';
	import { createEventDispatcher } from 'svelte';
	import { z } from 'zod';

	import AccountGroupingSelect from '../AccountGrouping/AccountGroupingSelect.svelte';
	import toastsStore from '../Toasts/toastsStore';
	import { BudgetCreateValidation } from './BudgetCreateValidation';
	import { budgetTableRefreshTrigger } from './budgetStores';

	const dispatch = createEventDispatcher();

	let newBudget: Partial<CreateBudgetInput> = {};
	let errors: Record<string, string> = {};

	let result: OperationResultStore<CreateBudgetMutation, CreateBudgetMutationVariables> | undefined;
	$: newBudgetLoading = $result?.fetching || false;
	$: if ($result?.error) {
		toastsStore.addToast({
			duration: 2000,
			style: 'filled',
			type: 'error',
			title: 'Budget Creation Error',
			description: $result.error.message
		});
	}

	$: if ($result?.data) {
		budgetTableRefreshTrigger.trigger();
		dispatch('complete');
	}

	const client = getContextClient();
	const createBudgetSubmit = async () => {
		const parsedBudget = BudgetCreateValidation.safeParse(newBudget);

		if (!parsedBudget.success) {
			errors = parsedBudget.error.issues.reduce(
				(prev, current) => ({
					...prev,
					[current.path[0]]: current.message
				}),
				{}
			);

			parsedBudget.error.issues.forEach((item) =>
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
				query: CreateBudgetDocument,
				variables: { input: parsedBudget.data }
			});
		}
	};
</script>

<form on:submit|preventDefault={createBudgetSubmit}>
	<div class="flex w-80 flex-col gap-2 rounded-md ">
		<AccountGroupingSelect
			bind:value={newBudget.accountGroupingId}
			id="accountGrouping"
			name="Account Grouping"
			errorMessage={errors['accountGroupingId']} />
		<Input
			id="newTitle"
			name="newTitle"
			bind:value={newBudget.title}
			type="text"
			placeholder={`New Title`}
			disabled={newBudgetLoading}
			errorMessage={errors['title']} />
		<Button defaultText="Add Category" type="submit" loading={newBudgetLoading} />
	</div>
</form>

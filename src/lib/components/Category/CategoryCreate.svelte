<script lang="ts">
	import Button from '$lib/components/Basic/Button.svelte';
	import Input from '$lib/components/Basic/Input.svelte';
	import {
		CreateCategoryDocument,
		type CreateCategoryInput,
		type CreateCategoryMutation,
		type CreateCategoryMutationVariables
	} from '$lib/graphqlClient/generated';
	import { getContextClient, mutationStore } from '@urql/svelte';
	import type { OperationResultStore } from '@urql/svelte/dist/types/common';
	import { createEventDispatcher } from 'svelte';

	import AccountGroupingSelect from '../AccountGrouping/AccountGroupingSelect.svelte';
	import toastsStore from '../Toasts/toastsStore';
	import { CategoryCreateValidation } from './CategoryCreateValidation';

	const dispatch = createEventDispatcher();

	let newCategory: Partial<CreateCategoryInput> = {};
	let errors: Record<string, string> = {};

	let result:
		| OperationResultStore<CreateCategoryMutation, CreateCategoryMutationVariables>
		| undefined;
	$: newCategoryLoading = $result?.fetching || false;
	$: if ($result?.error) {
		toastsStore.addToast({
			duration: 2000,
			style: 'filled',
			type: 'error',
			title: 'Category Creation Error',
			description: $result.error.message
		});
	}

	$: if ($result?.data) {
		dispatch('complete');
	}

	const client = getContextClient();
	const createCategorySubmit = async () => {
		const parsedTag = CategoryCreateValidation.safeParse(newCategory);

		if (!parsedTag.success) {
			errors = parsedTag.error.issues.reduce(
				(prev, current) => ({
					...prev,
					[current.path[0]]: current.message
				}),
				{}
			);

			parsedTag.error.issues.forEach((item) =>
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
				query: CreateCategoryDocument,
				variables: { input: parsedTag.data }
			});
		}
	};
</script>

<form on:submit|preventDefault={createCategorySubmit}>
	<div class="flex w-80 flex-col gap-2 rounded-md ">
		<AccountGroupingSelect
			bind:value={newCategory.accountGroupingId}
			id="accountGrouping"
			name="Account Grouping"
			errorMessage={errors['accountGroupingId']} />
		<Input
			id="newCategoryGroup"
			name="newCategoryGroup"
			bind:value={newCategory.group}
			type="text"
			placeholder={`New Category Group`}
			disabled={newCategoryLoading}
			errorMessage={errors['group']} />
		<Input
			id="newCategorySingle"
			name="newCategoryGroup"
			bind:value={newCategory.single}
			type="text"
			placeholder={`New Category Single`}
			disabled={newCategoryLoading}
			errorMessage={errors['single']} />
		<Button defaultText="Add Category" type="submit" loading={newCategoryLoading} />
	</div>
</form>

<script lang="ts">
	import Button from '$lib/components/Basic/Button.svelte';
	import Input from '$lib/components/Basic/Input.svelte';
	import {
		CreateTagDocument,
		type CreateTagInput,
		type CreateTagMutation,
		type CreateTagMutationVariables
	} from '$lib/graphqlClient/generated';
	import { getContextClient, mutationStore } from '@urql/svelte';
	import type { OperationResultStore } from '@urql/svelte/dist/types/common';
	import { createEventDispatcher } from 'svelte';
	import { TagCreateValidation } from './TagCreateValidation';

	import AccountGroupingSelect from '../AccountGrouping/AccountGroupingSelect.svelte';
	import toastsStore from '../Toasts/toastsStore';
	import { tagTableRefreshTrigger } from './tagStores';

	const dispatch = createEventDispatcher();

	let newTag: Partial<CreateTagInput> = {};
	let errors: Record<string, string> = {};

	let result: OperationResultStore<CreateTagMutation, CreateTagMutationVariables> | undefined;
	$: newTagLoading = $result?.fetching || false;
	$: if ($result?.error) {
		toastsStore.addToast({
			duration: 2000,
			style: 'filled',
			type: 'error',
			title: 'Tag Creation Error',
			description: $result.error.message
		});
	}

	$: if ($result?.data) {
		dispatch('complete');
		tagTableRefreshTrigger.trigger();
	}

	const client = getContextClient();
	const createTagSubmit = async () => {
		const parsedTag = TagCreateValidation.safeParse(newTag);

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
				query: CreateTagDocument,
				variables: { input: parsedTag.data }
			});
		}
	};
</script>

<form on:submit|preventDefault={createTagSubmit}>
	<div class="flex w-80 flex-col gap-2 rounded-md ">
		<AccountGroupingSelect
			bind:value={newTag.accountGroupingId}
			id="accountGrouping"
			name="Account Grouping"
			errorMessage={errors['accountGroupingId']} />
		<Input
			id="newTagGroup"
			name="newTagGroup"
			bind:value={newTag.group}
			type="text"
			placeholder={`New Tag Group`}
			disabled={newTagLoading}
			errorMessage={errors['group']} />
		<Input
			id="newTagSingle"
			name="newTagGroup"
			bind:value={newTag.single}
			type="text"
			placeholder={`New Tag Single`}
			disabled={newTagLoading}
			errorMessage={errors['single']} />
		<Button defaultText="Add Tag" type="submit" loading={newTagLoading} />
	</div>
</form>

<script lang="ts">
	import { AccountsDropdownAllDocument } from '$lib/graphqlClient/generated';
	import { getContextClient, queryStore } from '@urql/svelte';
	import { get, set } from 'lodash-es';

	import AccountInlineDropdown from '../Account/AccountInlineDropdown.svelte';
	import InlineWrapper from '../InlineEdit/InlineWrapper.svelte';
	import type { AccountSelectInfo } from '../Table/TableTypes';
	import { generalFilterStore } from './generalFilterStore';

	const client = getContextClient();

	$: accountDetails = queryStore({
		client,
		query: AccountsDropdownAllDocument,
		variables: {
			filter: {
				id: {
					in: accountIDsSelection ? accountIDsSelection : ['4f54d763-c319-4e30-a95a-da29ad8a0e65']
				}
			}
		}
	});
	$: selectedAccounts = $accountDetails?.data?.accounts?.accounts
		? $accountDetails.data.accounts.accounts.map((item) => ({
				...item,
				accountTitleCombined: item.accountTitleCombined || ''
		  }))
		: undefined;
	$: accountIDsSelection = get($generalFilterStore, 'account.id.in', undefined);

	const handleChange = (e: Event) => {
		const chosenItem = e.detail as AccountSelectInfo;
		console.log(chosenItem);
		let localFilterStore = $generalFilterStore;
		set(localFilterStore, 'account.id.in', chosenItem.id);
		$generalFilterStore = localFilterStore;
	};
	const clear = () => {
		let localFilterStore = $generalFilterStore;
		set(localFilterStore, 'account.id.in', undefined);
		$generalFilterStore = localFilterStore;
	};
</script>

<div class="flex w-40 flex-row gap-2">
	<InlineWrapper disabled={false}>
		<AccountInlineDropdown
			id="globalAccountSelection"
			value={selectedAccounts ? selectedAccounts[0] : undefined}
			clearable={true}
			disabled={false}
			loading={$accountDetails.fetching}
			noDisabled={false}
			on:update={handleChange}
			on:clear={clear}
			accountGrouping=""
			includeNew={false} />
	</InlineWrapper>
</div>

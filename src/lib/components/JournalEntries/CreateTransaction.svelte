<script lang="ts">
	import Button from '$lib/components/Basic/Button.svelte';
	import Input from '$lib/components/Basic/Input.svelte';
	import {
		CreateTransasctionDocument,
		type CreateTransasctionMutation,
		type CreateTransasctionMutationVariables
	} from '$lib/graphqlClient/generated';
	import { getContextClient, mutationStore } from '@urql/svelte';
	import type { OperationResultStore } from '@urql/svelte/dist/types/common';
	import { format } from 'date-fns';
	import { createEventDispatcher } from 'svelte';

	import AccountInlineDropdown from '../Account/AccountInlineDropdown.svelte';
	import AccountGroupingSelect from '../AccountGrouping/AccountGroupingSelect.svelte';
	import BillInlineDropdown from '../Bill/BillInlineDropdown.svelte';
	import BudgetInlineDropdown from '../Budget/BudgetInlineDropdown.svelte';
	import CategoryInlineDropdown from '../Category/CategoryInlineDropdown.svelte';
	import InlineCurrency from '../InlineEdit/InlineCurrency.svelte';
	import InlineWrapper from '../InlineEdit/InlineWrapper.svelte';
	import type {
		AccountSelectInfo,
		BillSelectInfo,
		BudgetSelectInfo,
		CategorySelectInfo,
		TagSelectInfo
	} from '../Table/TableTypes';
	import TagInlineDropdown from '../Tag/TagInlineDropdown.svelte';
	import toastsStore from '../Toasts/toastsStore';
	import {
		CreateSingleTransactionVariables,
		CreateTransactionValidation,
		type CreateTransactionValidationType
	} from './CreateTransactionValidation';

	const dispatch = createEventDispatcher();

	let newTransaction: CreateTransactionValidationType = {
		accountGroupingId: '',
		amount: 0,
		date: format(new Date(), 'yyyy-MM-dd'),
		description: '',
		linked: true,
		reconciled: false,
		dataChecked: false,
		complete: false
	};
	let errors: Record<string, string> = {};
	let fromAccount: AccountSelectInfo | undefined = {
		accountTitleCombined: '',
		id: 'Blank',
		title: 'From Account',
		type: 'Asset'
	};
	$: if (fromAccount && fromAccount.id !== 'Blank') {
		newTransaction.fromAccountId = fromAccount.id;
	}

	let toAccount: AccountSelectInfo | undefined = {
		accountTitleCombined: '',
		id: 'Blank',
		title: 'To Account',
		type: 'Asset'
	};
	$: if (toAccount && toAccount.id !== 'Blank') {
		newTransaction.toAccountId = toAccount.id;
	}

	const billBlank: BillSelectInfo | undefined = {
		id: 'Blank',
		title: 'Bill'
	};
	let bill: BillSelectInfo | undefined = billBlank;
	$: if (bill) {
		if (bill.id === 'Blank') newTransaction.billId = undefined;
		else newTransaction.billId = bill.id;
	}

	const budgetBlank: BudgetSelectInfo | undefined = {
		id: 'Blank',
		title: 'Budget'
	};
	let budget: BudgetSelectInfo | undefined = budgetBlank;
	$: if (budget) {
		if (budget.id === 'Blank') newTransaction.budgetId = undefined;
		else newTransaction.budgetId = budget.id;
	}

	const categoryBlank: CategorySelectInfo | undefined = {
		id: 'Blank',
		title: 'Category'
	};
	let category: CategorySelectInfo | undefined = categoryBlank;
	$: if (category) {
		if (category.id === 'Blank') newTransaction.categoryId = undefined;
		else newTransaction.categoryId = category.id;
	}

	const tagBlank: TagSelectInfo | undefined = {
		id: 'Blank',
		title: 'Tag'
	};
	let tag: TagSelectInfo | undefined = tagBlank;
	$: if (tag) {
		if (tag.id === 'Blank') newTransaction.tagId = undefined;
		else newTransaction.tagId = tag.id;
	}

	let result:
		| OperationResultStore<CreateTransasctionMutation, CreateTransasctionMutationVariables>
		| undefined;

	$: newTransactionLoading = $result?.fetching || false;
	$: if ($result?.error) {
		toastsStore.addToast({
			duration: 2000,
			style: 'filled',
			type: 'error',
			title: 'Transaction Creation Error',
			description: $result.error.message
		});
	}

	$: if ($result?.data) {
		dispatch('complete');
	}

	const client = getContextClient();
	const createTransactionSubmit = async () => {
		const parsedTransaction = CreateTransactionValidation.safeParse(newTransaction);

		if (!parsedTransaction.success) {
			errors = parsedTransaction.error.issues.reduce((prev, current) => {
				if (current.path.length === 0) return prev;
				return {
					...prev,
					[current.path[0]]: current.message
				};
			}, {});

			parsedTransaction.error.issues.forEach((item) =>
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
				query: CreateTransasctionDocument,
				variables: CreateSingleTransactionVariables(parsedTransaction.data)
			});
		}
	};
</script>

<form class="text-2xs" on:submit|preventDefault={createTransactionSubmit}>
	<div class="flex w-80 flex-col gap-2 rounded-md ">
		<AccountGroupingSelect
			bind:value={newTransaction.accountGroupingId}
			id="accountGrouping"
			name="Account Grouping"
			disabled={Boolean(newTransaction.accountGroupingId) || newTransactionLoading}
			errorMessage={errors['accountGroupingId']} />
		<Input
			id="newTransactionDescription"
			name="newTransactionDescription"
			bind:value={newTransaction.description}
			type="text"
			placeholder={`New Transaction Description`}
			disabled={newTransactionLoading || !newTransaction.accountGroupingId}
			errorMessage={errors['description']} />
		<Input
			id="newTransactionDate"
			name="newTransactionDate"
			bind:value={newTransaction.date}
			type="date"
			placeholder={`New Transaction Date`}
			disabled={newTransactionLoading || !newTransaction.accountGroupingId}
			errorMessage={errors['date']} />
		<InlineWrapper disabled={newTransactionLoading || !newTransaction.accountGroupingId}>
			<InlineCurrency
				id="newTransactionAmount"
				value={newTransaction.amount}
				on:enterOrBlur={(e) => {
					newTransaction.amount = e.detail;
				}}
				updateTime={new Date()}
				clearable={false}
				disabled={newTransactionLoading || !newTransaction.accountGroupingId}
				loading={false} />
		</InlineWrapper>
		<InlineWrapper disabled={newTransactionLoading || !newTransaction.accountGroupingId}>
			<AccountInlineDropdown
				accountGrouping={newTransaction.accountGroupingId}
				disabled={newTransactionLoading || !newTransaction.accountGroupingId}
				loading={false}
				id="newTransactionFromAccount"
				includeNew={false}
				value={fromAccount}
				on:update={(e) => (fromAccount = e.detail)} />
		</InlineWrapper>
		<InlineWrapper disabled={newTransactionLoading || !newTransaction.accountGroupingId}>
			<AccountInlineDropdown
				accountGrouping={newTransaction.accountGroupingId}
				disabled={newTransactionLoading || !newTransaction.accountGroupingId}
				loading={false}
				id="newTransactionToAccount"
				includeNew={false}
				value={toAccount}
				on:update={(e) => (toAccount = e.detail)} />
		</InlineWrapper>
		<InlineWrapper disabled={newTransactionLoading || !newTransaction.accountGroupingId}>
			<BillInlineDropdown
				accountGrouping={newTransaction.accountGroupingId}
				disabled={newTransactionLoading || !newTransaction.accountGroupingId}
				loading={false}
				id="newTransactionBill"
				includeNew={false}
				value={bill}
				clearable={true}
				on:update={(e) => (bill = e.detail)}
				on:clear={() => (bill = billBlank)} />
		</InlineWrapper>
		<InlineWrapper disabled={newTransactionLoading || !newTransaction.accountGroupingId}>
			<BudgetInlineDropdown
				accountGrouping={newTransaction.accountGroupingId}
				disabled={newTransactionLoading || !newTransaction.accountGroupingId}
				loading={false}
				id="newTransactionBudget"
				includeNew={false}
				value={budget}
				clearable={true}
				on:update={(e) => (budget = e.detail)}
				on:clear={() => (budget = budgetBlank)} />
		</InlineWrapper>
		<InlineWrapper disabled={newTransactionLoading || !newTransaction.accountGroupingId}>
			<CategoryInlineDropdown
				accountGrouping={newTransaction.accountGroupingId}
				disabled={newTransactionLoading || !newTransaction.accountGroupingId}
				loading={false}
				id="newTransactionCategory"
				includeNew={false}
				value={category}
				clearable={true}
				on:update={(e) => (category = e.detail)}
				on:clear={() => (category = categoryBlank)} />
		</InlineWrapper>
		<InlineWrapper disabled={newTransactionLoading || !newTransaction.accountGroupingId}>
			<TagInlineDropdown
				accountGrouping={newTransaction.accountGroupingId}
				disabled={newTransactionLoading || !newTransaction.accountGroupingId}
				loading={false}
				id="newTransactionTag"
				includeNew={false}
				value={tag}
				clearable={true}
				on:update={(e) => (tag = e.detail)}
				on:clear={() => (tag = tagBlank)} />
		</InlineWrapper>
		<Button defaultText="Add Transaction" type="submit" loading={newTransactionLoading} />
	</div>
</form>

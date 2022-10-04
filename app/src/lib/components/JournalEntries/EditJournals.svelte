<script lang="ts">
	import Button from '$lib/components/Basic/Button.svelte';
	import Input from '$lib/components/Basic/Input.svelte';
	import {
		UpdateJournalsByIdDocument,
		type UpdateJournalsByIdMutation,
		type UpdateJournalsByIdMutationVariables
	} from '$lib/graphqlClient/generated';
	import { getContextClient, mutationStore } from '@urql/svelte';
	import type { OperationResultStore } from '@urql/svelte/dist/types/common';
	import { createEventDispatcher } from 'svelte';

	import AccountInlineDropdown from '../Account/AccountInlineDropdown.svelte';
	import Buttons from '../Basic/Buttons.svelte';
	import BillInlineDropdown from '../Bill/BillInlineDropdown.svelte';
	import BudgetInlineDropdown from '../Budget/BudgetInlineDropdown.svelte';
	import CategoryInlineDropdown from '../Category/CategoryInlineDropdown.svelte';
	import InlineClearButton from '../InlineEdit/InlineClearButton.svelte';
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
	import type { EditJournalsInputValidationType } from './EditJournalsValidation';
	import { EditJournalsInputValidation } from './EditJournalsValidation';
	import type { addTotalsToJournalsType } from './addTotalsToJournals';

	const dispatch = createEventDispatcher();

	export let journals: addTotalsToJournalsType = [];
	export let popupOpen: boolean;
	$: ids = (journals ? journals.map((item) => item.id) : []) as string[];
	$: sameAccountGrouping = journals
		? [...new Set(journals.map((item) => item.accountGrouping.id))].length === 1
		: false;
	$: allTransactions2Journals = journals
		? journals.map((item) => item.primaryJournal.journalEntries.length).filter((item) => item > 2)
				.length === 0
		: false;
	$: accountGrouping = (
		journals ? journals.map((item) => item.accountGrouping.id)[0] : 'Test'
	) as string;
	$: allEditable = journals ? journals.filter((item) => !item.editable).length === 0 : false;
	$: allAmountsEditable = journals
		? journals.filter((item) => !item.amountEditable).length === 0
		: false;

	//Closes the popup if not all journals are editable (actually shouldn't be open, so this is belt and braces)
	$: if (!allEditable) {
		popupOpen = false;
	}
	$: if (!allAmountsEditable) {
		editJournalInput.amount = undefined;
	}
	let editJournalInput: EditJournalsInputValidationType = {};
	let errors: Record<string, string> = {};

	const accountBlank: AccountSelectInfo | undefined = {
		accountTitleCombined: '',
		id: 'Blank',
		title: 'Account',
		type: 'Asset'
	};
	let account: AccountSelectInfo | undefined = accountBlank;
	$: editJournalInput.accountId =
		account && account.id !== 'Blank' && sameAccountGrouping ? account.id : undefined;

	const otherAccountBlank: AccountSelectInfo | undefined = {
		accountTitleCombined: '',
		id: 'Blank',
		title: 'Payee',
		type: 'Asset'
	};
	let otherAccount: AccountSelectInfo | undefined = otherAccountBlank;
	$: editJournalInput.otherAccountId =
		otherAccount && otherAccount.id !== 'Blank' && sameAccountGrouping
			? otherAccount.id
			: undefined;

	const billBlank: BillSelectInfo | undefined = {
		id: 'Blank',
		title: 'Bill'
	};
	let bill: BillSelectInfo | undefined = billBlank;
	$: editJournalInput.billId =
		bill && bill.id !== 'Blank' && sameAccountGrouping ? bill.id : undefined;

	const budgetBlank: BudgetSelectInfo | undefined = {
		id: 'Blank',
		title: 'Budget'
	};
	let budget: BudgetSelectInfo | undefined = budgetBlank;
	$: editJournalInput.budgetId =
		budget && budget.id !== 'Blank' && sameAccountGrouping ? budget.id : undefined;

	const categoryBlank: CategorySelectInfo | undefined = {
		id: 'Blank',
		title: 'Category'
	};
	let category: CategorySelectInfo | undefined = categoryBlank;
	$: editJournalInput.categoryId =
		category && category.id !== 'Blank' && sameAccountGrouping ? category.id : undefined;

	const tagBlank: TagSelectInfo | undefined = {
		id: 'Blank',
		title: 'Tag'
	};
	let tag: TagSelectInfo | undefined = tagBlank;
	$: editJournalInput.tagId = tag && tag.id !== 'Blank' && sameAccountGrouping ? tag.id : undefined;

	let result:
		| OperationResultStore<UpdateJournalsByIdMutation, UpdateJournalsByIdMutationVariables>
		| undefined;

	$: editJournalsLoading = $result?.fetching || false;
	$: if ($result?.error) {
		toastsStore.addToast({
			duration: 2000,
			style: 'filled',
			type: 'error',
			title: 'Journal Edit Error',
			description: $result.error.message
		});
	}

	$: if ($result?.data) {
		dispatch('complete');
	}

	$: editedItems = Object.keys(editJournalInput).filter(
		(item) => editJournalInput[item] !== undefined
	);
	$: editMade = editedItems.length > 0;

	const client = getContextClient();
	const createTransactionSubmit = async () => {
		const parsedEditJournals = EditJournalsInputValidation.safeParse(editJournalInput);

		if (!parsedEditJournals.success) {
			errors = parsedEditJournals.error.issues.reduce((prev, current) => {
				if (current.path.length === 0) return prev;
				return {
					...prev,
					[current.path[0]]: current.message
				};
			}, {});

			parsedEditJournals.error.issues.forEach((item) =>
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
				query: UpdateJournalsByIdDocument,
				variables: { input: parsedEditJournals.data, ids }
			});
		}
	};
</script>

<form class="text-2xs" on:submit|preventDefault={createTransactionSubmit}>
	<div class="flex w-80 flex-col gap-2 rounded-md ">
		<InlineClearButton
			clearable={true}
			hasValue={editJournalInput.description !== undefined}
			on:clear={() => (editJournalInput.description = undefined)}>
			<Input
				id="newTransactionDescription"
				class="w-full"
				name="newTransactionDescription"
				bind:value={editJournalInput.description}
				type="text"
				placeholder={`New Transaction Description`}
				disabled={editJournalsLoading}
				errorMessage={errors['description']} /></InlineClearButton>
		<InlineClearButton
			clearable={true}
			hasValue={editJournalInput.date !== undefined}
			on:clear={() => (editJournalInput.date = undefined)}>
			<Input
				id="newTransactionDate"
				class="w-full"
				name="newTransactionDate"
				bind:value={editJournalInput.date}
				type="date"
				placeholder={`New Transaction Date`}
				disabled={editJournalsLoading}
				errorMessage={errors['date']} />
		</InlineClearButton>
		{#if !allAmountsEditable}
			<InlineClearButton
				clearable={true}
				hasValue={editJournalInput.amount !== undefined}
				on:clear={() => (editJournalInput.amount = undefined)}>
				<InlineWrapper disabled={editJournalsLoading}>
					<InlineCurrency
						id="newTransactionAmount"
						value={editJournalInput.amount}
						on:enterOrBlur={(e) => {
							editJournalInput.amount = e.detail;
						}}
						updateTime={new Date()}
						disabled={editJournalsLoading}
						loading={false} />
				</InlineWrapper>
			</InlineClearButton>
		{/if}
		<InlineClearButton
			clearable={true}
			on:clear={() => (editJournalInput.reconciled = undefined)}
			hasValue={editJournalInput.reconciled !== undefined}>
			<Buttons
				class="w-full"
				options={[
					{
						label: 'Reconciled',
						value: 'Reconciled',
						selected: editJournalInput.reconciled === true,
						colour: 'blue',
						onClick: () => (editJournalInput.reconciled = true)
					},
					{
						label: 'Unreconciled',
						value: 'Unreconciled',
						selected: editJournalInput.reconciled === false,
						colour: 'blue',
						onClick: () => (editJournalInput.reconciled = false)
					}
				]} />
		</InlineClearButton>
		<InlineClearButton
			clearable={true}
			on:clear={() => (editJournalInput.dataChecked = undefined)}
			hasValue={editJournalInput.dataChecked !== undefined}>
			<Buttons
				class="w-full"
				options={[
					{
						label: 'Data Checked',
						value: 'Data Checked',
						selected: editJournalInput.dataChecked === true,
						colour: 'blue',
						onClick: () => (editJournalInput.dataChecked = true)
					},
					{
						label: 'Data Not Checked',
						value: 'Data Not Checked',
						selected: editJournalInput.dataChecked === false,
						colour: 'blue',
						onClick: () => (editJournalInput.dataChecked = false)
					}
				]} />
		</InlineClearButton>
		{#if sameAccountGrouping}
			<InlineClearButton
				clearable={true}
				on:clear={() => (account = accountBlank)}
				hasValue={editJournalInput.accountId !== undefined}>
				<InlineWrapper disabled={editJournalsLoading}>
					<AccountInlineDropdown
						{accountGrouping}
						disabled={editJournalsLoading}
						loading={false}
						id="newTransactionFromAccount"
						includeNew={false}
						value={account}
						on:update={(e) => (account = e.detail)} />
				</InlineWrapper>
			</InlineClearButton>
			{#if allTransactions2Journals}
				<InlineClearButton
					clearable={true}
					on:clear={() => (otherAccount = otherAccountBlank)}
					hasValue={editJournalInput.otherAccountId !== undefined}>
					<InlineWrapper disabled={editJournalsLoading}>
						<AccountInlineDropdown
							{accountGrouping}
							disabled={editJournalsLoading}
							loading={false}
							id="otherAccount"
							includeNew={false}
							value={otherAccount}
							on:update={(e) => (otherAccount = e.detail)} />
					</InlineWrapper>
				</InlineClearButton>
			{/if}
			<InlineClearButton
				clearable={true}
				on:clear={() => (bill = billBlank)}
				hasValue={editJournalInput.billId !== undefined}>
				<InlineWrapper disabled={editJournalsLoading}>
					<BillInlineDropdown
						{accountGrouping}
						disabled={editJournalsLoading}
						loading={false}
						id="newTransactionBill"
						includeNew={false}
						value={bill}
						on:update={(e) => (bill = e.detail)} />
				</InlineWrapper>
			</InlineClearButton>
			<InlineClearButton
				clearable={true}
				on:clear={() => (budget = budgetBlank)}
				hasValue={editJournalInput.budgetId !== undefined}>
				<InlineWrapper disabled={editJournalsLoading}>
					<BudgetInlineDropdown
						{accountGrouping}
						disabled={editJournalsLoading}
						loading={false}
						id="newTransactionBudget"
						includeNew={false}
						value={budget}
						on:update={(e) => (budget = e.detail)} />
				</InlineWrapper>
			</InlineClearButton>
			<InlineClearButton
				clearable={true}
				on:clear={() => (category = categoryBlank)}
				hasValue={editJournalInput.categoryId !== undefined}>
				<InlineWrapper disabled={editJournalsLoading}>
					<CategoryInlineDropdown
						{accountGrouping}
						disabled={editJournalsLoading}
						loading={false}
						id="newTransactionCategory"
						includeNew={false}
						value={category}
						on:update={(e) => (category = e.detail)} />
				</InlineWrapper>
			</InlineClearButton>
			<InlineClearButton
				clearable={true}
				on:clear={() => (tag = tagBlank)}
				hasValue={editJournalInput.tagId !== undefined}>
				<InlineWrapper disabled={editJournalsLoading}>
					<TagInlineDropdown
						{accountGrouping}
						disabled={editJournalsLoading}
						loading={false}
						id="newTransactionTag"
						includeNew={false}
						value={tag}
						on:update={(e) => (tag = e.detail)} />
				</InlineWrapper>
			</InlineClearButton>
		{/if}
		<Button
			defaultText="Update Journals"
			type="submit"
			loading={editJournalsLoading}
			disabled={!editMade} />
	</div>
</form>

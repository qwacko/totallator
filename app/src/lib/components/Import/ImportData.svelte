<script lang="ts">
	import { handleImport, type ImportErrorType, type ImportType } from './handleImport';
	import { getContextClient } from '@urql/svelte';
	import AccountGroupingSelect from '../AccountGrouping/AccountGroupingSelect.svelte';
	import ImportDataTable from './ImportDataTable.svelte';
	import Buttons from '../Basic/Buttons.svelte';
	import type { ButtonsOptions } from '../Basic/ButtonsOptions';
	import type { ImportDataResult } from '$lib/graphqlClient/generated';
	import ImportTagTable from './ImportTagTable.svelte';
	import ImportAccountTable from './ImportAccountTable.svelte';
	import ImportBillTable from './ImportBillTable.svelte';
	import ImportBudgetTable from './ImportBudgetTable.svelte';
	import ImportCategoryTable from './ImportCategoryTable.svelte';
	let files: FileList | null | undefined;
	let errors: ImportErrorType[] | undefined | null;

	const client = getContextClient();
	let loadingStatus: { loading: boolean; message: string } = { loading: false, message: '' };
	let accountGroupingId = '';
	let currentImportData: ImportDataResult = {};
	let importType: ImportType = 'json';

	let importModeOptions: ButtonsOptions = [];
	$: importModeOptions = [
		{
			label: 'CSV',
			value: 'csv',
			selected: importType === 'csv',
			onClick: () => {
				files = undefined;
				importType = 'csv';
			},
			colour: 'blue'
		},
		{
			label: 'JSON',
			value: 'json',
			selected: importType === 'json',
			onClick: () => {
				files = undefined;
				importType = 'json';
			},
			colour: 'blue'
		}
	];

	//Handle Button Mode
	type DisplayTabs = 'Journals' | 'Accounts' | 'Categories' | 'Bills' | 'Budgets' | 'Tags';
	let displayTab: DisplayTabs = 'Journals';
	let displayButtons: ButtonsOptions = [];
	$: journalCount = currentImportData.journals ? currentImportData.journals.length : 0;
	$: accountCount = currentImportData.accounts ? currentImportData.accounts.length : 0;
	$: categoryCount = currentImportData.categories ? currentImportData.categories.length : 0;
	$: billCount = currentImportData.bills ? currentImportData.bills.length : 0;
	$: budgetCount = currentImportData.budgets ? currentImportData.budgets.length : 0;
	$: tagCount = currentImportData.tags ? currentImportData.tags.length : 0;
	$: resultsExist =
		journalCount || accountCount || categoryCount || billCount || budgetCount || tagCount;
	const displayButton = (
		selection: DisplayTabs,
		title: DisplayTabs,
		count: number
	): ButtonsOptions[0] => ({
		label: `${title} (${count})`,
		value: title,
		selected: selection === title,
		onClick: () => (displayTab = title),
		colour: 'blue'
	});
	$: displayButtons = [
		displayButton(displayTab, 'Journals', journalCount),
		displayButton(displayTab, 'Accounts', accountCount),
		displayButton(displayTab, 'Categories', categoryCount),
		displayButton(displayTab, 'Bills', billCount),
		displayButton(displayTab, 'Budgets', budgetCount),
		displayButton(displayTab, 'Tags', tagCount)
	];

	//TODO Improve import look and feel
	//TODO Add ability to download import templates
	//TODO Expand import to include other items (Tags, Bills, Budgets, Accounts, Categories) - Make this a single import
	//TODO Add ability to export to same template as import (To allow for update and import)
	//LATER Allow import from JSON file (so a simpler export format) - Should also export to the same format.
</script>

<div class="flex flex-col">
	<div class="flex flex-col p-2">
		<div class="flex w-52">
			<AccountGroupingSelect bind:value={accountGroupingId} id="ag" name="ag" />
		</div>
		{#if accountGroupingId !== ''}
			<Buttons class="flex w-52" options={importModeOptions} />
			{#if !files}
				{#if importType === 'csv'}
					<div class="flex m-1">
						<input type="file" accept=".csv" bind:files />
					</div>
				{:else if importType === 'json'}
					<div class="flex m-1">
						<input type="file" accept=".json" bind:files />
					</div>
				{/if}
			{:else}
				<div class="flex flex-row">
					<div class="flex m-1">
						{files[0].name}
					</div>
					<button
						class="flex m-1 mr-4 font-bold border border-red-400 rounded-md px-2 text-red-600 hover:bg-red-600 hover:text-white"
						on:click={() => (files = undefined)}>X</button>
				</div>
				<button
					class="flex border rounded-sm bg-gray-100 w-32 justify-center m-1 border-black disabled:text-gray-400 disabled:border-gray-400 hover:bg-gray-300"
					disabled={!files || files.length !== 1}
					on:click={() =>
						handleImport({
							files,
							setErrors: (newErrors) => (errors = newErrors),
							setStatus: (newStatus) => (loadingStatus = newStatus),
							setData: (newData) => (currentImportData = newData),
							client,
							accountGroupingId,
							importType
						})}>Check Import</button>
			{/if}
		{/if}
	</div>
	{#if loadingStatus.loading}
		<div class="flex bg-blue-100 rounded-md font-bold p-4">
			{loadingStatus.message}
		</div>
	{/if}
	{#if errors}
		<div class="flex flex-col gap-2 mx-6 my-4">
			{#each errors as error}
				<div class="flex flex-col w-full border bg-red-100 rounded-sm gap-2 p-2">
					<div class="flex font-bold">
						{error.title}
					</div>
					{#if error.location || error.message}
						<div class="flex flex-row gap-2">
							{#if error.location}
								<div class="flex ">
									Location : {error.location}
								</div>
							{/if}
							{#if error.message}
								<div class="flex ">
									Message : {error.message}
								</div>
							{/if}
						</div>
					{/if}
				</div>
			{/each}
		</div>
	{/if}
	{#if resultsExist}
		<Buttons options={displayButtons} />
		{#if currentImportData.journals && displayTab === 'Journals'}
			{#if journalCount > 0}
				<ImportDataTable data={currentImportData.journals} />
			{:else}
				<div class="bg-blue-200 rounded-md border">No Journals Found</div>
			{/if}
		{/if}
		<ImportAccountTable data={currentImportData.accounts} selected={displayTab === 'Accounts'} />
		<ImportTagTable data={currentImportData.tags} selected={displayTab === 'Tags'} />
		<ImportBillTable data={currentImportData.bills} selected={displayTab === 'Bills'} />
		<ImportBudgetTable data={currentImportData.budgets} selected={displayTab === 'Budgets'} />
		<ImportCategoryTable
			data={currentImportData.categories}
			selected={displayTab === 'Categories'} />
	{/if}
</div>

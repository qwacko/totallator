<script lang="ts">
	import AccountGroupingSelect from '../AccountGrouping/AccountGroupingSelect.svelte';
	import { getContextClient, queryStore } from '@urql/svelte';
	import { GetExportDataDocument } from '$lib/graphqlClient/generated';
	import { exportProcess } from './exportProcess';

	//@ts-expect-error No Definitions Exist For This Package
	import { CSVDownloader } from 'svelte-csv';
	import { format } from 'date-fns';

	let accountGroupingId = '';

	const client = getContextClient();

	$: pause = accountGroupingId === '';
	$: exportData = queryStore({
		client,
		query: GetExportDataDocument,
		variables: {
			accountGroupingId
		},
		pause,
		requestPolicy: 'cache-and-network'
	});

	const date = format(new Date(), "yyyy-MM-dd'");

	$: loadingPaused = exportData.isPaused$;
	$: loading = !$loadingPaused && ($exportData.fetching || $exportData.stale);
	$: processedData = exportProcess($exportData.data);
	$: accountGroupingTitle = $exportData.data?.accountGrouping
		? $exportData.data.accountGrouping?.title
		: '';

	//TODO Make the export page actually look nice.
</script>

<div class="flex flex-col p-10 gap-2">
	<AccountGroupingSelect bind:value={accountGroupingId} id="ag" name="ag" class="w-60" />
	{#if loading}
		<div class="flex bg-blue-200 rounded-sm">Loading</div>
	{/if}

	{#if processedData}
		<div class="flex">Data Received</div>
		<div class="flex">
			{#if processedData.accounts.length > 0}
				<CSVDownloader
					data={processedData.accounts}
					type="button"
					class="bg-black"
					filename={`${date}-${accountGroupingTitle}-accounts`}
					><div class="flex p-2 border border-black rounded-sm bg-blue-100 hover:bg-blue-300">
						Export Accounts ({processedData.accounts.length} items)
					</div></CSVDownloader>
			{:else}
				<div class="flex p-2">No Accounts Found</div>
			{/if}
		</div>
		<div class="flex">
			{#if processedData.categories.length > 0}
				<CSVDownloader
					data={processedData.categories}
					type="button"
					class="bg-black"
					filename={`${date}-${accountGroupingTitle}-categories`}
					><div class="flex p-2 border border-black rounded-sm bg-blue-100 hover:bg-blue-300">
						Export Categories ({processedData.categories.length} items)
					</div></CSVDownloader>
			{:else}
				<div class="flex p-2">No Categories Found</div>
			{/if}
		</div>
		<div class="flex">
			{#if processedData.bills.length > 0}
				<CSVDownloader
					data={processedData.bills}
					type="button"
					class="bg-black"
					filename={`${date}-${accountGroupingTitle}-bills`}
					><div class="flex p-2 border border-black rounded-sm bg-blue-100 hover:bg-blue-300">
						Export Bills ({processedData.bills.length} items)
					</div></CSVDownloader>
			{:else}
				<div class="flex p-2">No Bills Found</div>
			{/if}
		</div>
		<div class="flex">
			{#if processedData.budgets.length > 0}
				<CSVDownloader
					data={processedData.budgets}
					type="button"
					class="bg-black"
					filename={`${date}-${accountGroupingTitle}-budgets`}
					><div class="flex p-2 border border-black rounded-sm bg-blue-100 hover:bg-blue-300">
						Export Budgets ({processedData.budgets.length} items)
					</div></CSVDownloader>
			{:else}
				<div class="flex p-2">No Budgets Found</div>
			{/if}
		</div>
		<div class="flex">
			{#if processedData.tags.length > 0}
				<CSVDownloader
					data={processedData.tags}
					type="button"
					class="bg-black"
					filename={`${date}-${accountGroupingTitle}-tags`}
					><div class="flex p-2 border border-black rounded-sm bg-blue-100 hover:bg-blue-300">
						Export Tags ({processedData.tags.length} items)
					</div></CSVDownloader>
			{:else}
				<div class="flex p-2">No Tags Found</div>
			{/if}
		</div>
		<div class="flex">
			{#if processedData.journalEntries.length > 0}
				<CSVDownloader
					data={processedData.journalEntries}
					type="button"
					class="bg-black"
					filename={`${date}-${accountGroupingTitle}-journalEntries`}
					><div class="flex p-2 border border-black rounded-sm bg-blue-100 hover:bg-blue-300">
						Export Journal Entries ({processedData.journalEntries.length} items)
					</div></CSVDownloader>
			{:else}
				<div class="flex p-2">No Journal Entries Found</div>
			{/if}
		</div>
	{/if}
</div>

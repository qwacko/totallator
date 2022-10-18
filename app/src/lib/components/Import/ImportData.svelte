<script lang="ts">
	import { handleImport, type ImportErrorType } from './handleImport';
	import { getContextClient } from '@urql/svelte';
	import AccountGroupingSelect from '../AccountGrouping/AccountGroupingSelect.svelte';
	import ImportDataTable from './ImportDataTable.svelte';
	import type { ImportDataProcessed } from '$lib/graphqlClient/generated';
	let files: FileList | null | undefined;
	let errors: ImportErrorType[] | undefined | null;

	const client = getContextClient();
	let loadingStatus: { loading: boolean; message: string } = { loading: false, message: '' };
	let accountGroupingId = '';
	let currentImportData: ImportDataProcessed[] = [];

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
			{#if !files}
				<div class="flex m-1">
					<input type="file" accept=".csv" bind:files />
				</div>
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
							accountGroupingId
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
	{#if currentImportData.length > 0}
		<ImportDataTable data={currentImportData} />
	{/if}
</div>

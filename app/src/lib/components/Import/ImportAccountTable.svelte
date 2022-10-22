<script lang="ts">
	import type { ImportAccountProcessed } from '$lib/graphqlClient/generated';
	import GenericImportTable from './GenericImportTable.svelte';

	export let data: ImportAccountProcessed[] | null | undefined;
	export let selected: boolean;

	const columnConfig: { title: string; key: keyof ImportAccountProcessed }[] = [
		{ title: 'Title', key: 'title' },
		{ title: 'Type', key: 'type' },
		{ title: 'Account Group', key: 'accountGroup' },
		{ title: 'Account Group 2', key: 'accountGroup2' },
		{ title: 'Account Group 3', key: 'accountGroup3' },
		{ title: 'Start Date', key: 'startDate' },
		{ title: 'End Date', key: 'endDate' },
		{ title: 'Cash', key: 'isCash' },
		{ title: 'Net Worth', key: 'isNetWorth' },
		{ title: 'Status', key: 'status' },
		{ title: 'createdAt', key: 'createdAt' },
		{ title: 'updatedAt', key: 'updatedAt' }
	];
</script>

<GenericImportTable {data} {columnConfig} {selected} noItemsText="No Accounts Found" />

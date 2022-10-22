<script lang="ts">
	import type { ImportBudgetProcessed } from '$lib/graphqlClient/generated';
	import GenericImportTable from './GenericImportTable.svelte';

	export let data: ImportBudgetProcessed[] | undefined | null;
	export let selected: boolean;

	const columnConfig: { title: string; key: keyof ImportBudgetProcessed }[] = [
		{ title: 'Title', key: 'title' },
		{ title: 'Status', key: 'status' },
		{ title: 'createdAt', key: 'createdAt' },
		{ title: 'updatedAt', key: 'updatedAt' }
	];
</script>

<GenericImportTable {data} {columnConfig} {selected} noItemsText="No Budgets Found" />

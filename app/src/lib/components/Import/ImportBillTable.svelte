<script lang="ts">
	import type { ImportBillProcessed } from '$lib/graphqlClient/generated';
	import GenericImportTable from './GenericImportTable.svelte';

	export let data: ImportBillProcessed[] | undefined | null;
	export let selected: boolean;

	const columnConfig: { title: string; key: keyof ImportBillProcessed }[] = [
		{ title: 'Title', key: 'title' },
		{ title: 'Status', key: 'status' },
		{ title: 'createdAt', key: 'createdAt' },
		{ title: 'updatedAt', key: 'updatedAt' }
	];
</script>

<GenericImportTable {data} {columnConfig} {selected} noItemsText="No Bills Found" />

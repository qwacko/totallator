<script lang="ts">
	import type { ImportCategoryProcessed } from '$lib/graphqlClient/generated';
	import GenericImportTable from './GenericImportTable.svelte';

	export let data: ImportCategoryProcessed[] | undefined | null;
	export let selected: boolean;

	const columnConfig: { title: string; key: keyof ImportCategoryProcessed }[] = [
		{ title: 'Title', key: 'title' },
		{ title: 'Single', key: 'single' },
		{ title: 'Group', key: 'group' },
		{ title: 'Status', key: 'status' },
		{ title: 'createdAt', key: 'createdAt' },
		{ title: 'updatedAt', key: 'updatedAt' }
	];
</script>

<GenericImportTable {data} {columnConfig} {selected} noItemsText="No Categories Found" />

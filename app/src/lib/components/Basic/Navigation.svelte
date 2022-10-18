<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import UserDisplay from '../Authentication/UserDisplay.svelte';

	$: routeLocation = $page.url.pathname;

	const pages = [
		{ title: 'Home', path: '/' },
		{ title: 'Import', path: '/import' },
		{ title: 'Export', path: '/export' },
		{ title: 'Account', path: '/account' },
		{ title: 'Account Groupings', path: '/accountGroupings' },
		{ title: 'Accounts', path: '/accounts' },
		{ title: 'Tags', path: '/tags' },
		{ title: 'Bills', path: '/bills' },
		{ title: 'Budgets', path: '/budgets' },
		{ title: 'Categories', path: '/categories' },
		{ title: 'Journals', path: '/journals' }
	];
</script>

<div class="flex flex-row gap-0 p-2">
	<div class="flex flex-row gap-0 p-2">
		{#each pages as currentPage}
			<button
				class="text-md flex border-y border-r p-2 first:rounded-l-md last:rounded-r-md  {routeLocation ===
				currentPage.path
					? 'bg-blue-200'
					: 'hover:bg-slate-200'}"
				on:click={() => goto(currentPage.path)}>{currentPage.title}</button>
		{/each}
	</div>
	<div class="flex flex-grow" />
	<UserDisplay class="mr-3" />
</div>

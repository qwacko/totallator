<script lang="ts">
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	import '@skeletonlabs/skeleton/styles/skeleton.css';

	import '../app.postcss';
	import { page } from '$app/stores';

	//Make Popups Work
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { AppShell, storePopup } from '@skeletonlabs/skeleton';
	import NavigationLink from '$lib/components/NavigationLink.svelte';
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	export let data;

	$: accountGroupings = $page.url.pathname.startsWith('/accountGroupings');
	$: users = $page.route.id?.startsWith('/(loggedIn)/users');
	$: user = $page.route.id?.startsWith('/(loggedIn)/user') && !users;
	$: login = $page.route.id?.startsWith('/(loggedOut)');
	$: homePage = $page.url.pathname === '/';
</script>

<AppShell>
	<svelte:fragment slot="header">
		<div class="flex flex-row gap-2 p-2 items-stretch">
			<NavigationLink url="/">Home</NavigationLink>

			{#if data.user.user}
				<NavigationLink url="/user">User</NavigationLink>
				<NavigationLink url="/users">Users</NavigationLink>
				<NavigationLink url="/accountGroupings">AccountGroupings</NavigationLink>
				<div class="flex">
					{$page.url.pathname}
				</div>
				<div class="flex flex-1" />
				<form action="/?/logout" method="post">
					<button type="submit" class="btn btn-sm flex variant-ghost-secondary">Logout</button>
				</form>
			{:else}
				<div class="flex">
					{$page.url.pathname} - LoggedOut
				</div>
				<div class="flex flex-1" />

				<NavigationLink url="/login">Login</NavigationLink>
			{/if}
		</div>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">Sidebar Left</svelte:fragment>

	<slot />
</AppShell>

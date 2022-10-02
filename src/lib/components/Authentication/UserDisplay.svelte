<script lang="ts">
	import { goto } from '$app/navigation';
	import { GetUserDataDocument } from '$lib/graphqlClient/generated';
	import { getContextClient, queryStore } from '@urql/svelte';
	import { getSession, signOut } from 'lucia-sveltekit/client';

	import Button from '../Basic/Button.svelte';

	const client = getContextClient();
	const userInfo = queryStore({ client, query: GetUserDataDocument });

	const lucia = getSession();

	let loading = false;
	const signoutAndRedirect = async () => {
		loading = true;
		await signOut();
		goto('/users/login');
		loading = false;
	};

	$: loadingUser = loading || $userInfo.fetching;
</script>

<div class={$$props.class}>
	{#if $lucia}
		<div class="flex w-min flex-row items-center justify-center gap-3">
			<div class="flex whitespace-nowrap">{$userInfo.data?.user?.email}</div>
			<div class="flex">
				<Button
					loading={loadingUser}
					defaultText="Sign Out"
					loadingText="Signing Out"
					on:click={signoutAndRedirect} />
			</div>
		</div>
	{:else}
		<Button {loading} defaultText="Login" />
	{/if}
</div>

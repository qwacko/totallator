<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import type { PageData } from './$types';
	import CenterCard from '$lib/components/CenterCard.svelte';
	import DataWrapper from '$lib/components/DataWrapper.svelte';
	import SpreadButtons from '$lib/components/SpreadButtons.svelte';
	import Button from '$lib/components/Button.svelte';

	export let data: PageData;

	let loading = false;
	let localData: null | string = null;

	const isBrowser = typeof window !== 'undefined';

	const invalidate = () => {
		invalidateAll();
		loadData();
	};

	const loadData = async () => {
		loading = true;
		localData = await 'Found The Data';
		loading = false;
	};

	if (isBrowser) {
		loadData();
	}
</script>

<CenterCard title="User"
	><DataWrapper>
		<h1>User id:</h1>
		<p>{data.user.user.userId}</p>
		<h1>Username:</h1>
		<p>{data.user.user.username}</p>
	</DataWrapper>

	<DataWrapper>
		<h1>TRPC Data Sources</h1>
		<p>
			Local Request : {#if loading}Loading...{:else}{localData}
			{/if}
		</p>
	</DataWrapper>
	<SpreadButtons>
		<form use:enhance method="post" action="?/logout">
			<Button type="submit" style="primary">Sign out</Button>
		</form>
		<Button type="button" style="secondary" on:click={invalidate}>Refresh Data</Button>
	</SpreadButtons>
</CenterCard>

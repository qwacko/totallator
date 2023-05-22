<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import type { PageData } from './$types';
	import CenterCard from '$lib/components/CenterCard.svelte';
	import DataWrapper from '$lib/components/DataWrapper.svelte';
	import SpreadButtons from '$lib/components/SpreadButtons.svelte';
	import Button from '$lib/components/Button.svelte';

	export let data: PageData;

	const invalidate = () => {
		invalidateAll();
	};
</script>

<CenterCard title="User"
	><DataWrapper>
		<h1>User id:</h1>
		<p>{data.user.user.userId}</p>
		<h1>Username:</h1>
		<p>{data.user.user.username}</p>
	</DataWrapper>

	<SpreadButtons>
		<form use:enhance method="post" action="?/logout">
			<Button type="submit" style="primary">Sign out</Button>
		</form>
		<Button type="button" style="secondary" on:click={invalidate}>Refresh Data</Button>
	</SpreadButtons>
</CenterCard>

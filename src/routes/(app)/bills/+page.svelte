<script lang="ts">
	import Button from '$lib/components/Basic/Button.svelte';
	import InlineSpinner from '$lib/components/Basic/InlineSpinner.svelte';
	import Modal from '$lib/components/Basic/Modal.svelte';
	import PageHeading from '$lib/components/Basic/PageHeading.svelte';
	import BillCreate from '$lib/components/Bill/BillCreate.svelte';
	import BillTable from '$lib/components/Bill/BillTable.svelte';
	import type { BillFilter, BillSort, InputMaybe } from '$lib/graphqlClient/generated';

	let showModal = false;

	let loading = false;
	let sort: InputMaybe<BillSort | BillSort[]> | undefined;
	let filter: InputMaybe<BillFilter> | undefined;
</script>

<Modal bind:show={showModal}>
	<div class="flex flex-col items-center gap-2">
		<div class="flex text-lg font-bold">Create Bill</div>
		<BillCreate on:complete={() => (showModal = false)} />
	</div>
</Modal>

<div class="flex flex-col">
	<PageHeading>
		{#if loading}<InlineSpinner hidden={true} size="lg" />{/if}
		<div class="flex">Bills</div>
		<Button
			class="self-center rounded-full text-sm"
			on:click={() => (showModal = true)}
			defaultText="+" />
		{#if loading}<InlineSpinner size="lg" />{/if}
	</PageHeading>
	<BillTable bind:sort bind:filter bind:loading />
</div>

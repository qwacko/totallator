<script lang="ts">
	import Button from '$lib/components/Basic/Button.svelte';
	import InlineSpinner from '$lib/components/Basic/InlineSpinner.svelte';
	import Modal from '$lib/components/Basic/Modal.svelte';
	import PageHeading from '$lib/components/Basic/PageHeading.svelte';
	import CategoryCreate from '$lib/components/Category/CategoryCreate.svelte';
	import CategoryTable from '$lib/components/Category/CategoryTable.svelte';
	import type { CategoryFilter, CategorySort, InputMaybe } from '$lib/graphqlClient/generated';

	let showModal = false;

	let loading = false;
	let sort: InputMaybe<CategorySort | CategorySort[]> | undefined;
	let filter: InputMaybe<CategoryFilter> | undefined;
</script>

<Modal bind:show={showModal}>
	<div class="flex flex-col items-center gap-2">
		<div class="flex text-lg font-bold">Create Category</div>
		<CategoryCreate on:complete={() => (showModal = false)} />
	</div>
</Modal>

<div class="flex flex-col">
	<PageHeading>
		{#if loading}<InlineSpinner hidden={true} size="lg" />{/if}
		<div class="flex">Categories</div>
		<Button
			class="self-center rounded-md text-sm"
			on:click={() => (showModal = true)}
			defaultText="+" />
		{#if loading}<InlineSpinner size="lg" />{/if}
	</PageHeading>
	<CategoryTable bind:sort bind:filter bind:loading />
</div>

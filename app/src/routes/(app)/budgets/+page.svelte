<script lang="ts">
	import Button from '$lib/components/Basic/Button.svelte';
	import InlineSpinner from '$lib/components/Basic/InlineSpinner.svelte';
	import Modal from '$lib/components/Basic/Modal.svelte';
	import PageHeading from '$lib/components/Basic/PageHeading.svelte';
	import BudgetCreate from '$lib/components/Budget/BudgetCreate.svelte';
	import BudgetTable from '$lib/components/Budget/BudgetTable.svelte';
	import type { BudgetFilter, BudgetSort, InputMaybe } from '$lib/graphqlClient/generated';

	let showModal = false;

	let loading = false;
	let sort: InputMaybe<BudgetSort | BudgetSort[]> | undefined;
	let filter: InputMaybe<BudgetFilter> | undefined;
</script>

<Modal bind:show={showModal}
	><div class="flex flex-col items-center gap-2">
		<div class="flex text-lg font-bold">Create Budget</div>
		<BudgetCreate on:complete={() => (showModal = false)} />
	</div>
</Modal>

<div class="flex flex-col">
	<PageHeading>
		{#if loading}<InlineSpinner hidden={true} size="lg" />{/if}
		<div class="flex">Budgets</div>
		<Button
			class="self-center rounded-full text-sm"
			on:click={() => (showModal = true)}
			defaultText="+" />
		{#if loading}<InlineSpinner size="lg" />{/if}
	</PageHeading>
	<BudgetTable bind:sort bind:filter bind:loading />
</div>
